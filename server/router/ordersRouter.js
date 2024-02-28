const express =  require('express');
const ordersRouter = express.Router();
const db = require("../db.js");

// 전체 조회
ordersRouter.get("/", async (request, response) => {
    let data = request.query.bno;
    let result = await db.connection('orders', 'orderList', data);
    response.send(result);
});

module.exports = ordersRouter;