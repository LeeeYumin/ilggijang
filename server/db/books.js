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

// 도서 리스트 컴포넌트 (검색결과. SQL에서 확인 먼저 해주고 작성해주면 좋음.)
// let query = "%" + q + "%";
const bookSearchList =
`SELECT book_img
      , book_name
      , title
      , publ_date
      , book_price
FROM prdt
WHERE book_name LIKE ?`;

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




module.exports = {
    bookList,
    bookInsert,
    bookUpdate,
    bookDelete,
    bookDetailInfo,
    bookSearchList,
    bookDetailSearch
  }