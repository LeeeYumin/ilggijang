const express =  require('express');
const ordersdetailRouter = express.Router();
const db = require("../db.js");

// 주문상세목록
ordersdetailRouter.get("/orderlist/:ono", async (request, response) => {
    let data = request.params.ono;
    let result = await db.connection('ordersdetail', 'orderDetailList', data);
    response.send(result);
});

module.exports = ordersdetailRouter;