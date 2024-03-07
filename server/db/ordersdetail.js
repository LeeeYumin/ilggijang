// orders.js

// 주문목록
const orderDetailList = 
`SELECT *
FROM orders o JOIN ordersdetail d
ON o.orders_no = d.orders_no
WHERE user_no = ?`;

// 주문상세등록
const orderDetailInsert = 
`INSERT INTO ordersdetail
SET ?`;

module.exports = {
    orderDetailList,    
    orderDetailInsert
  }