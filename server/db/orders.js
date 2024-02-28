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

// 주문등록
const orderInsert = 
`INSERT INTO orders
        (recipient
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
        , pay_result)
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
    orderInsert,
    orderUpdate,
    orderDelete
  }