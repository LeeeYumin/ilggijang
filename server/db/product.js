// 상품 전체보기
const productList =
`SELECT prdt_no
      , isbn
      , book_name
      , book_img
      , title
      , publ_co
      , book_price
      , detail_exp
      , publ_date
      , category_code
FROM  prdt
LIMIT 10`;

// 상품 페이징..
const prdtPaging =
`SELECT book_img
        , book_name
        , isbn
        , title
        , publ_co
        , book_price      
FROM prdt 
ORDER BY prdt_no DESC 
LIMIT ?, 10`;

// 상품 상세보기 컴포넌트 (관리자)
const productDetailInfo =
`SELECT prdt_no
      , isbn
      , book_name
      , book_img
      , title
      , publ_co
      , book_price
      , detail_exp
      , publ_date
      , category_code
FROM  prdt
WHERE prdt_no = ?`;

// 상품관리 입력 컴포넌트 (관리자)
// const productInsert =
// `INSERT INTO prdt
// SET ?`;

// 상품관리 수정 컴포넌트 (관리자)
const productUpdate =
`UPDATE prdt
SET ?
WHERE prdt_no = ?`;

// 상품관리 삭제 컴포넌트 (관리자)
const productDelete =
`DELETE FROM prdt
WHERE prdt_no = ?`;

// 상품관리 입력 컴포넌트 (관리자) -> 사용
const prdtInsert =
`INSERT INTO prdt
			(prdt_no, isbn, book_name, book_img, title, publ_co, book_price, detail_exp, publ_date, category_code)
VALUES (
        (SELECT CONCAT('BK', TO_CHAR(SYSDATE(), 'yyMMdd'), LPAD(NVL(MAX(SUBSTR(p.prdt_no, -3)), 0) + 1, 3, '0')) as pno
        from prdt p
        WHERE SUBSTR(p.prdt_no, 3, 6) = TO_CHAR(SYSDATE(), 'yyMMdd'))
        , ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`;


module.exports = {
      productList,
      productDetailInfo,
      productUpdate,
      productDelete,
      prdtInsert,
      prdtPaging
  }