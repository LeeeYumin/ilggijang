// orders.js

// 주문목록
const orderList = 
`SELECT recipient
        , dlv_addr
        , orders_date
        , orders_state
        , total_orders_amount
        , dc_amount
        , total_pay_amount
        , phone
        , dlv_amount
        , orders_no
        , user_no
        , pay_type
        , pay_result
FROM orders`;

// 단건조회
const orderInfo = 
`SELECT recipient
        , dlv_addr
        , orders_date
        , orders_state
        , total_orders_amount
        , dc_amount
        , total_pay_amount
        , phone
        , dlv_amount
        , orders_no
        , user_no
        , pay_type
        , pay_result
FROM orders
WHERE orders_no = ?`;

// 나의 주문목록
const myOrderList = 
`SELECT o.orders_date,
        o.orders_no,
        p.book_img,
        p.book_name,
        o.orders_date,
        d.quantity,
        o.orders_state,
        p.book_price,
        (p.book_price * d.quantity) as 'order_price',
        count(*) as 'count'
FROM ordersdetail d
                    JOIN orders o ON o.orders_no = d.orders_no
                    JOIN prdt p ON d.prdt_no = p.prdt_no
WHERE user_no = ?
GROUP BY o.orders_no
ORDER BY o.orders_date DESC`;


// 관리자 - 주문관리
const salesList = 
`SELECT o.orders_date,
        o.orders_no,
        o.user_no,
        p.book_img,
        p.book_name,
        o.orders_date,
        d.quantity,
        o.orders_state,
        p.book_price,
        count(*) as 'count',
        (p.book_price * d.quantity) as 'order_price'
FROM ordersdetail d
                    JOIN orders o ON o.orders_no = d.orders_no
                    JOIN prdt p ON d.prdt_no = p.prdt_no
GROUP BY o.orders_no                    
ORDER BY o.orders_date DESC`;

// 주문등록
const orderInsert = 
`INSERT INTO orders
SET ?`;

// 주문수정
const orderUpdate = 
`UPDATE orders
SET ?
WHERE orders_no = ?`; 

// 주문삭제
const orderDelete = 
`DELETE FROM orders
WHERE orders_no = ?`;

module.exports = {
    orderList,
    orderInfo,
    orderInsert,
    orderUpdate,
    orderDelete,
    myOrderList,
    salesList
  }