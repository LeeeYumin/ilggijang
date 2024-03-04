const express =  require('express');
const bookRouter = express.Router();
const db = require("../db.js");

// 전체 조회 (관리자)
bookRouter.get("/", async (request, response) => {
  let result = await db.connection('books', 'bookList');
  response.send(result);
});

// 도서 검색결과
bookRouter.get("/:pname", async (request, response) => {
  let data = request.params.pname;
  console.log(data);
  let result = await db.connection('books', 'bookSearchList', data);
  response.send(result);
});

// 상품 상세조회
bookRouter.get("/:pno", async (request, response) => { //:prdt_no 에서 수정
  let data = request.params.pno;
  let result = (await db.connection('books', 'bookDetailInfo', data))[0];
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

// 함수

module.exports = bookRouter;