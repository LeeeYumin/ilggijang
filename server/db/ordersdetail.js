// orders.js

// 주문목록
const orderDetailList = 
`SELECT d.orders_detail_no
               , p.book_img
               , p.book_name           
               , d.quantity
               , d.orders_no
               , p.prdt_no
               , d.unit_price
               , o.orders_state
               , o.recipient
               , o.dlv_addr
               , o.phone
               , r.orders_detail_no AS rodtno
FROM ordersdetail d
                    JOIN orders o ON o.orders_no = d.orders_no
                    JOIN prdt p ON d.prdt_no = p.prdt_no
                    LEFT OUTER JOIN review r ON d.orders_detail_no = r.orders_detail_no
WHERE d.orders_no = ?`;

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