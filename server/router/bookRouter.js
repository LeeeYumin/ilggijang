const express =  require('express');
const bookRouter = express.Router();
const db = require("../db.js");

// 전체 조회
bookRouter.get("/", async (request, response) => {
  let result = await db.connection('books', 'bookList');
  response.send(result);
});

//상품 상세조회
bookRouter.get("/:pno", async (request, response) => { //:prdt_no 에서 수정
  let data = request.params.pno;
  let result = await db.connection('books', 'bookDetailInfo', data);
  response.send(result);
});

// 상품관리 입력 (관리자)
bookRouter.post("/", async (request, response) => {
  let data = request.body.param;
  let result = await db.connection('books', 'bookInsert', data);
  response.send(result);
});

// 상품관리 수정 (관리자)
bookRouter.put("/:pno", async (request, response) => {
  let data = [request.body.param, request.params.pno];
  let result = await db.connection('books', 'bookUpdate', data);
  response.send(result);
});

// 상품관리 삭제 (관리자)
bookRouter.delete("/:pno", async (request, response) => {
  let data = request.params.pno;
  let result = await db.connection('books', 'bookDelete', data);
  response.send(result);
});

// 추천도서 목록 (연령대별 구매순)
bookRouter.get("/agelike/:agecode", async (request, response) => {
  let data = request.params.agecode;
  let result = await db.connection('books', 'ageLikeBookList', data);
  response.send(result);
});

// 베스트셀러 목록 (3개월 판매량 순)
bookRouter.get("/bestseller", async (request, response) => {
  let result = await db.connection('books', 'bestSellerBookList');
  response.send(result);
});

// 신간도서 목록 (12개월 내 출판 날짜순)
bookRouter.get("/newpubl", async (request, response) => {
  let result = await db.connection('books', 'newPublBookList');
  response.send(result);
});

// 분야별 인기도서 목록 (각 분야별 판매량 순)
bookRouter.get("/category/:catcode", async (request, response) => {
  let data = request.params.agecode;
  let result = await db.connection('books', 'categoryBookList', data);
  response.send(result);
});

// 함수

module.exports = bookRouter;