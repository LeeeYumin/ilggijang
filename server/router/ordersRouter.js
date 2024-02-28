const express =  require('express');
const ordersRouter = express.Router();
const db = require("../db.js");

// 주문목록
ordersRouter.get("/", async (request, response) => {
    let result = await db.connection('orders', 'orderList');
    response.send(result);
});

// 단건조회
ordersRouter.get("/:orders_no", async (request, response) => {
    let data = request.params.orders_no;
    let result = (await db.connection('orders', 'orderInfo', data))[0];
    response.send(result);
});

// 주문등록 
ordersRouter.post("/", async (request, response) => {
    let data = request.body.param;
    let result = await db.connection('orders', 'orderInsert', data);
    response.send(result);
});

// 주문수정
ordersRouter.put("/:orders_no", async (request, response) => {
    let data = [request.body.param, request.params.orders_no];
    console.log(data);
    let result = await db.connection('orders', 'orderUpdate', data);
    response.send(result);
});


// 주문삭제
ordersRouter.delete("/:orders_no", async (request, response) => {
    let data = request.params.orders_no;
    console.log(data);
    let result = await db.connection('orders', 'orderDelete', data);
    response.send(result);
});

// 함수

module.exports = ordersRouter;