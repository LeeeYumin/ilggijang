const bookList = ``;



// 상품관리 입력 컴포넌트 (관리자)
const bookInsert =
`INSERT INTO prdt(prdt_no
                , isbn
                , book_name
                , book_img
                , title
                , publ_co
                , book_price
                , book_intro
                , detail_exp
                , publ_date
                , category_code)
SET ?`;

module.exports = {
    bookList,
    bookInsert
  }