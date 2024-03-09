const express =  require('express');
const ordersdetailRouter = express.Router();
const db = require("../db.js");

// 주문상세목록  user_no값 들어와야함
ordersdetailRouter.get("/user/:uno", async (request, response) => {
    let data = request.params.uno;
    let result = await db.connection('orderlist', 'orderDetailList', data);
    response.send(result);
});

module.exports = ordersdetailRouter;