// save.js

// 찜목록
const saveList = 
`SELECT s.user_no
        , s.prdt_no
        , p.book_name
        , p.book_price
        , p.book_img
        , p.title
FROM save s 
        JOIN prdt p ON s.prdt_no = p.prdt_no
        JOIN user u ON s.user_no = u.user_no
WHERE s.user_no = ?`;


// 찜등록
const saveInsert = 
`INSERT INTO save
SET ?`;

// 찜삭제
const saveDelete = 
`DELETE FROM save
WHERE prdt_no = ?`;

// 찜 전체삭제
const saveAllDelete =
`DELETE FROM save
WHERE user_no = ?`;

// 찜 -> 장바구니 찜 삭제(장바구니에 추가시)
const savePickDelete =
`DELETE FROM save
WHERE user_no = ?`;

module.exports = {
    saveList,
    saveInsert,
    saveDelete,
    saveAllDelete,
    savePickDelete
  }