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
FROM  prdt`;

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
const productInsert =
`INSERT INTO prdt
SET ?`;

// 상품관리 수정 컴포넌트 (관리자)
const productUpdate =
`UPDATE prdt
SET ?
WHERE prdt_no = ?`;

// 상품관리 삭제 컴포넌트 (관리자)
const productDelete =
`DELETE FROM prdt
WHERE prdt_no = ?`;



module.exports = {
      productList,
      productDetailInfo,
      productInsert,
      productUpdate,
      productDelete
  }