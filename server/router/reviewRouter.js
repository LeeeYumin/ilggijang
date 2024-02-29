const express = require('express');
const reviewRouter = express.Router();
const db = require("../db.js");

// 도서 상세 리뷰 목록
reviewRouter.get("/list/:pno/:odno", async (request, response) => {
    let data = [request.params.pno, request.params.odno];
    let result = await db.connection('reviews', 'detailReviewList', data);
    response.send(result);
});

// 도서 상세 내 리뷰 목록
reviewRouter.get("/mlist/:uno/:pno", async (request, response) => {
    let data = [request.params.uno, request.params.pno];
    let result = await db.connection('reviews', 'detailMyReviewList', data);
    response.send(result);
});

// 관리자 리뷰 목록
reviewRouter.get("/admin", async (request, response) => {
    let result = await db.connection('reviews', 'adminReviewList');
    response.send(result);
});

// 리뷰 등록
reviewRouter.post("/", async (request, response) => {
    let data = request.body.rjson;
    let result = await db.connection('reviews', 'reviewInsert', data);
    response.send(result);
});

// 리뷰 수정
reviewRouter.put("/:rno", async (request, response) => {
    let data = [request.body.rjson, request.params.rno];
    let result = await db.connection('reviews', 'reviewUpdate', data);
    response.send(result);
});

// 리뷰 삭제
reviewRouter.delete("/:rno", async (request, response) => {
    let data = request.params.rno;
    let result = await db.connection('reviews', 'reviewDelete', data);
    response.send(result);
});


module.exports = reviewRouter;