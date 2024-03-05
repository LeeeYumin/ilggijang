const express =  require('express');
const cartRouter = express.Router();
const db = require("../db.js");

// 주문목록
cartRouter.get("/:uno", async (request, response) => {
    let data = request.params.uno;
    let result = await db.connection('cart', 'cartList', data);
    response.send(result);
});

// 주문등록 
cartRouter.post("/", async (request, response) => {
    let data = request.body.param;
    let result = await db.connection('cart', 'cartInsert', data);
    response.send(result);
});

// 주문수정
cartRouter.put("/:cno", async (request, response) => {
    let data = [request.body.param, request.params.cno];
    console.log(data);
    let result = await db.connection('cart', 'cartUpdate', data);
    response.send(result);
});


// 주문삭제
cartRouter.delete("/:cno", async (request, response) => {
    let data = request.params.cno;
    console.log(data);
    let result = await db.connection('cart', 'cartDelete', data);
    response.send(result);
});

// 함수

module.exports = cartRouter;