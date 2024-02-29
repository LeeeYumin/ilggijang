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

// 상품관리 입력
bookRouter.post("/", async (request, response) => {
  let data = request.body.param;
  let result = await db.connection('books', 'bookInsert', data);
  response.send(result);
});

// 상품관리 수정
bookRouter.put("/:pno", async (request, response) => {
  let data = [request.body.param, request.params.pno];
  let result = await db.connection('books', 'bookUpdate', data);
  response.send(result);
});

// 상품관리 삭제
bookRouter.delete("/:pno", async (request, response) => {
  let data = request.params.pno;
  let result = await db.connection('books', 'bookDelete', data);
  response.send(result);
});



// 함수


module.exports = bookRouter;