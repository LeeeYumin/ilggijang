const express =  require('express');
const ordersdetailRouter = express.Router();
const db = require("../db.js");

// 주문상세목록  user_no값 들어와야함
ordersdetailRouter.get("/", async (request, response) => {
    let result = await db.connection('orderdetail', 'orderDetailList');
    response.send(result);
});

module.exports = ordersdetailRouter;