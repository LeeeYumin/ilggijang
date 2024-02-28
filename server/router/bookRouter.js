const express =  require('express');
const bookRouter = express.Router();
const db = require("../db.js");

// 전체 조회
bookRouter.get("/", async (request, response) => {
  result = await db.connection('books', 'bookList');
  response.send(result);
});

//상품 상세조회
bookRouter.get("/:prdt_no", async (request, response) => {
  let data = request.params.prdt_no;
  result = await db.connection('books', 'bookDetailInfo', data);
  response.send(result);
});

// 상품관리 입력
bookRouter.post("/", async (request, response) => {
  let data = request.body.param;
  result = await db.connection('books', 'bookInsert', data);
  response.send(result);
});

// 상품관리 수정
bookRouter.put("/:prdt_no", async (request, response) => {
  let data = [request.body.param, request.params.prdt_no];
  result = await db.connection('books', 'bookUpdate', data);
  response.send(result);
});

// 상품관리 삭제
bookRouter.delete("/:prdt_no", async (request, response) => {
  let data = request.params.prdt_no;
  result = await db.connection('books', 'bookDelete', data);
  response.send(result);
});



// 함수


module.exports = bookRouter;