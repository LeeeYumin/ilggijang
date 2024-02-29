// cart.js

// 장바구니목록
const cartList = 
`SELECT cart_no
        , quantity
        , user_no
        , prdt_no
FROM cart`;

// 장바구니조회
const cartInfo = 
`SELECT cart_no
        , quantity
        , user_no
        , prdt_no
        FROM cart
WHERE cart_no = ?`;

// 장바구니등록
const cartInsert = 
`INSERT INTO cart
SET ?`;

// 장바구니수정
const cartUpdate = 
`UPDATE cart
SET ?
WHERE cart_no = ?`; 

// 장바구니삭제
const cartDelete = 
`DELETE FROM cart
WHERE cart_no = ?`;

module.exports = {
    cartList,
    cartInfo,
    cartInsert,
    cartUpdate,
    cartDelete
  }