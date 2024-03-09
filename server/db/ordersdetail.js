// orders.js

// 주문목록
const orderDetailList = 
`SELECT SELECT orders_detail_no
               , quantity
               , orders_no
               , prdt_no
               , unit_price
               , orders_amount
FROM ordersdetail o JOIN prdt p
					          ON o.prdt_no = p.prdt_no
WHERE orders_no = ?`;

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