// 상품 전체보기
const bookList =
`SELECT prdt_no
      , isbn
      , book_name
      , book_img
      , title
      , publ_co
      , book_price
      , book_intro
      , detail_exp
      , publ_date
      , category_code
FROM  prdt`;

// 상품 상세보기 컴포넌트 (관리자)
const bookDetailInfo =
`SELECT prdt_no
      , isbn
      , book_name
      , book_img
      , title
      , publ_co
      , book_price
      , book_intro
      , detail_exp
      , publ_date
      , category_code
FROM  prdt
WHERE prdt_no = ?`;

// 상품관리 입력 컴포넌트 (관리자)
const bookInsert =
`INSERT INTO prdt
SET ?`;

// 상품관리 수정 컴포넌트 (관리자)
const bookUpdate =
`UPDATE prdt
SET ?
WHERE prdt_no = ?`;

// 상품관리 삭제 컴포넌트 (관리자)
const bookDelete =
`DELETE FROM prdt
WHERE prdt_no = ?`;

// 도서 리스트 컴포넌트 (검색결과)
const bookSearchList =
`SELECT book_img
      , book_name
      , title
      , publ_date
      , book_price
FROM prdt`;

// 도서 상세정보 컴포넌트 (상+하단)
const bookDetailSearch =
`SELECT book_name
      , book_img
      , isbn
      , title
      , book_price
      , publ_co
      , category_code
      , publ_date
      , detail_exp
      , book_intro
FROM  prdt`;

// 추천도서 목록 (연령대별 구매순)
const ageLikeBookList =
`SELECT DISTINCT p.book_name
		, p.book_img
        , p.title
        , p.category_code
        , (SELECT COUNT(*)
			FROM user uc
            JOIN orders oc
            ON (uc.user_no = oc.user_no)
            JOIN ordersdetail odc
            ON (oc.orders_no = odc.orders_no)
            WHERE odc.prdt_no = p.prdt_no AND uc.age_code = u.age_code) AS ordercnt
FROM prdt p
JOIN ordersdetail od
ON (p.prdt_no = od.prdt_no)
JOIN orders o
ON (od.orders_no = o.orders_no)
JOIN user u
ON (o.user_no = u.user_no)
WHERE u.age_code = ?
ORDER BY ordercnt DESC`; // 연령대 코드 필요

// 베스트셀러 목록 (3개월 판매량 순)
const bestSellerBookList =
`SELECT book_name
		, book_img
        , title
        , category_code
        , (SELECT COUNT(*)
			FROM orders oc
            JOIN ordersdetail odc
            ON (oc.orders_no = odc.orders_no)
            WHERE odc.prdt_no = p.prdt_no AND TIMESTAMPDIFF(MONTH, oc.orders_date, CURDATE()) < 3) AS ordercnt
FROM prdt p
ORDER BY ordercnt DESC`;

// 신간도서 목록 (12개월 내 출판 날짜순)
const newPublBookList =
`SELECT book_name
		, book_img
        , title
        , category_code
        , publ_date
FROM prdt
WHERE TIMESTAMPDIFF(MONTH, publ_date, CURDATE()) < 12
ORDER BY publ_date DESC`;

// 분야별 인기도서 목록 (각 분야별 판매량 순)
const categoryBookList =
`SELECT book_name
		, book_img
        , title
        , category_code
        , (SELECT COUNT(*)
			FROM orders oc
            JOIN ordersdetail odc
            ON (oc.orders_no = odc.orders_no)
            WHERE odc.prdt_no = p.prdt_no) AS ordercnt
FROM prdt p
WHERE category_code = ?
ORDER BY ordercnt DESC`; // 카테고리 코드 필요

module.exports = {
    bookList,
    bookInsert,
    bookUpdate,
    bookDelete,
    bookDetailInfo,
    bookSearchList,
    bookDetailSearch
    , ageLikeBookList
    , bestSellerBookList
    , newPublBookList
    , categoryBookList
  }