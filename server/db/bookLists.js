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
ORDER BY ordercnt, p.book_name DESC
LIMIT ?, 8`; // 연령대 코드 필요, 페이지 값 필요
const ageLikePageCnt =
`SELECT COUNT(DISTINCT p.prdt_no) AS pcnt
FROM prdt p
JOIN ordersdetail od
ON (p.prdt_no = od.prdt_no)
JOIN orders o
ON (od.orders_no = o.orders_no)
JOIN user u
ON (o.user_no = u.user_no)
WHERE u.age_code = ?`; // 연령대 코드 필요


// 베스트셀러 목록 (3개월 내 판매량 순)
const bestSellerBookList =
`SELECT DISTINCT book_name
		, book_img
        , title
        , category_code
        , (SELECT COUNT(*)
			FROM orders oc
            JOIN ordersdetail odc
            ON (oc.orders_no = odc.orders_no)
            WHERE odc.prdt_no = p.prdt_no AND TIMESTAMPDIFF(MONTH, oc.orders_date, CURDATE()) < 3) AS ordercnt
FROM prdt p
JOIN ordersdetail od
ON (p.prdt_no = od.prdt_no)
JOIN orders o
ON (od.orders_no = o.orders_no)
WHERE TIMESTAMPDIFF(MONTH, o.orders_date, CURDATE()) < 3
ORDER BY ordercnt, book_name DESC
LIMIT ?, 8`; // 페이지 값 필요
const bestSellerPageCnt =
`SELECT COUNT(DISTINCT p.prdt_no) AS pcnt
FROM prdt p
JOIN ordersdetail od
ON (p.prdt_no = od.prdt_no)
JOIN orders o
ON (od.orders_no = o.orders_no)
WHERE TIMESTAMPDIFF(MONTH, o.orders_date, CURDATE()) < 3`;


// 신간도서 목록 (12개월 내 출판 날짜순)
const newPublBookList =
`SELECT book_name
		, book_img
        , title
        , category_code
        , publ_date
FROM prdt
WHERE TIMESTAMPDIFF(MONTH, publ_date, CURDATE()) < 12
ORDER BY publ_date, book_name DESC
LIMIT ?, 8`; // 페이지 값 필요
const newPublPageCnt =
`SELECT COUNT(*) AS pcnt
FROM prdt
WHERE TIMESTAMPDIFF(MONTH, publ_date, CURDATE()) < 12`;


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
ORDER BY ordercnt, book_name DESC`; // 카테고리 코드 필요

module.exports = {
    ageLikeBookList, ageLikePageCnt
    , bestSellerBookList, bestSellerPageCnt
    , newPublBookList, newPublPageCnt
    , categoryBookList
}