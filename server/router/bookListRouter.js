const express = require('express');
const bookListRouter = express.Router();
const db = require("../db.js");

// 추천도서 목록 (연령대별 구매순)
bookListRouter.get("/:agecode/:pgno/:lno", async (request, response) => {
  let data = [request.params.agecode, parseInt(request.params.pgno), request.params.lno];
  let result = await db.connection('bookLists', listSelect(data[2]), data);
  response.send(result);
});

// 베스트셀러 목록 (3개월 내 판매량 순)
bookListRouter.get("/:pgno/:lno", async (request, response) => {
  let data = [parseInt(request.params.pgno), request.params.lno];
  let result = await db.connection('bookLists', listSelect(data[1]), data);
  response.send(result);
});
bookListRouter.get("/bestpage", async (request, response) => {
  let result = (await db.connection('bookLists', 'bestSellerPageCnt'))[0];
  response.send(result);
}); // 페이징

// 신간도서 목록 (12개월 내 출판 날짜순)
// bookListRouter.get("/:nlno/:pgno", async (request, response) => {
//   let data = request.params;
//   let result = await db.connection('bookLists', listSelect(data.nlno), data);
//   response.send(result);
// });

// // 분야별 인기도서 목록 (각 분야별 판매량 순)
// bookListRouter.get("/:clno/:catcode", async (request, response) => {
//   let data = request.params;
//   let result = await db.connection('bookLists', listSelect(data.clno), data);
//   response.send(result);
// });

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