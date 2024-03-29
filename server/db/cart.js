// cart.js
// 장바구니 전체조회
const cartAllList =
`SELECT *
FROM cart
WHERE user_no = ?`;

// 장바구니 목록
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

// 장바구니 등록
const cartInsert =
`INSERT INTO cart
SET ?`;

// 찜 -> 장바구니 등록
const likeCartInsert =
`INSERT INTO cart (quantity, prdt_no, user_no)
VALUES ?`;


// 장바구니 수정
const cartUpdate =
`UPDATE cart
SET ?
WHERE cart_no = ?`;

// 장바구니 삭제
const cartDelete =
`DELETE FROM cart
WHERE cart_no = ?`;

// 장바구니 전체삭제
const cartAllDelete =
`DELETE FROM cart
WHERE user_no = ?`;

// 주문목록 장바구니 삭제(장바구니에서 구매시)
const cartPickDelete =
`DELETE FROM cart
WHERE user_no = ?`;

// 주문목록 장바구니 삭제
// const cartPickDelete =
// `DELETE FROM cart
// WHERE prdt_no = ?`;

// 장바구니 (중복체크) 만들고 cartRouter 에 넣기
const cartCheck =
`SELECT cart_no
        , quantity
        , user_no
        , prdt_no
FROM cart
WHERE user_no = ?
AND   prdt_no = ?`;

module.exports = {
    cartAllList,
    cartList,
    cartInsert,
    cartUpdate,
    cartDelete,
    cartPickDelete,
    cartCheck,
    cartAllDelete,
    likeCartInsert
  }