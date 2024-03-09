// orders.js

// 주문목록
const orderDetailList = 
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
        , orders_detail_no
        , quantity
        , orders_no
        , prdt_no
        , unit_price
        , orders_amount
FROM orders o JOIN ordersdetail d
ON o.orders_no = d.orders_no
WHERE user_no = ?`;

// 주문상세등록
const orderDetailInsert = 
`INSERT INTO ordersdetail
            (
              quantity
              , prdt_no
              , unit_price
              , orders_no
            )
VALUES ?`; // [[''],[],[]]

// [['quantity', 'prdt_no', 'unit_price', 'orders_no'], [], []]

module.exports = {
    orderDetailList,    
    orderDetailInsert
  }