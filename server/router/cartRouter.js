const express =  require('express');
const cartRouter = express.Router();
const db = require("../db.js");
var url = require('url');

// 장바구니목록
cartRouter.get("/user/:uno", async (request, response) => {
    let data = request.params.uno;
    let result = await db.connection('cart', 'cartList', data);
    response.send(result);
});


// 장바구니등록
cartRouter.post("/", async (request, response) => {
    let data = request.body.param;
    let result = await db.connection('cart', 'cartInsert', data);
    response.send(result);
});

// 찜 -> 장바구니등록
cartRouter.post("/like", async (request, response) => {
    let data = request.body.param;
    console.log('데이터 확인', data);

    let result = await db.connection('cart', 'likeCartInsert', [data]);
    response.send(result);
});

// 장바구니수정
cartRouter.put("/:cno", async (request, response) => {
    let data = [request.body.param, request.params.cno];
    console.log(data);
    let result = await db.connection('cart', 'cartUpdate', data);
    response.send(result);
});


// 장바구니삭제
cartRouter.delete("/:cno", async (request, response) => {
    let data = request.params.cno;
    console.log(data);
    let result = await db.connection('cart', 'cartDelete', data);
    response.send(result);
});

// 장바구니 전체삭제
cartRouter.delete("/user/:uno", async (request, response) => {
    let data = request.params.uno;
    console.log(data);
    let result = await db.connection('cart', 'cartAllDelete', data);
    response.send(result);
});

// 장바구니 중복체크
cartRouter.get("/cartCheck", async (request, response) => {
    console.log(request.url,"===================")
    var queryData = url.parse(request.url, true).query;
    let data = [queryData.uno, queryData.pno]
    console.log(data)
    let result = await db.connection('cart', 'cartCheck', data);
    let exist = '';
    if (result.length > 0){
        exist = false;
        console.log("중복값 없음")
      }else{
        exist = true;
        console.log("중복값 있음")
      }
      response.send(exist);
    }
    );

// 함수

module.exports = cartRouter;