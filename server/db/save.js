// save.js

// 찜목록
const saveList = 
`SELECT user_no
        , prdt_no
FROM save`;

// 찜등록
const saveInsert = 
`INSERT INTO save
SET ?`;

// 찜삭제
const saveDelete = 
`DELETE FROM save
WHERE prdt_no = ?`;

module.exports = {
    saveList,
    saveInsert,
    saveDelete
  }