const express = require('express');
const bookListRouter = express.Router();
const db = require("../db.js");

// 추천도서 목록 (연령대별 구매순)
bookListRouter.get("/:lno/:agecode", async (request, response) => {
  let data = request.params;
  let result = await db.connection('bookLists', listSelect(data.lno), data);
  response.send(result);
});

// 베스트셀러 목록 (3개월 판매량 순)
bookListRouter.get("/:lno", async (request, response) => {
  let data = request.params;
  let result = await db.connection('bookLists', listSelect(data.lno), data);
  response.send(result);
});

// 신간도서 목록 (12개월 내 출판 날짜순)
bookListRouter.get("/:lno", async (request, response) => {
  let data = request.params;
  let result = await db.connection('bookLists', listSelect(data.lno), data);
  response.send(result);
});

// 분야별 인기도서 목록 (각 분야별 판매량 순)
bookListRouter.get("/:lno/:catcode", async (request, response) => {
  let data = request.params;
  let result = await db.connection('bookLists', listSelect(data.lno), data);
  response.send(result);
});

// 함수
function listSelect(listno) { // 목록 구분용 함수
  switch (listno) {
    case '1':
      return 'ageLikeBookList';
    case '2':
      return 'bestSellerBookList';
    case '3':
      return 'newPublBookList';
    case '4':
      return 'categoryBookList';
  } 

}

module.exports = bookListRouter;