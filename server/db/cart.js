// cart.js

// 장바구니목록
const cartList = 
`SELECT c.cart_no
        , p.book_name
        , p.book_img
        , p.title
        , p.book_price
        , c.quantity
        , p.book_price * c.quantity as 'total_price'
        , c.user_no
        , p.prdt_no
FROM cart c JOIN prdt p
            ON c.prdt_no = p.prdt_no
WHERE c.user_no = ?`;

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
    cartInsert,
    cartUpdate,
    cartDelete
  }