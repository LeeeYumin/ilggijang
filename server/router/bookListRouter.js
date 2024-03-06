const express = require('express');
const bookListRouter = express.Router();
const db = require("../db.js");

// 추천도서 목록 (연령대별 구매순)
bookListRouter.get("/recdlist/:agecode/:pgno", async (request, response) => {
  let data = [request.params.agecode, parseInt(request.params.pgno)];
  let result = await db.connection('bookLists', 'recdBookList', data);
  response.send(result);
});
// 추천도서 목록 페이징 (연령대별 구매순)
bookListRouter.get("/recdlist/:agecode", async (request, response) => {
  let data = request.params.agecode;
  let result = await db.connection('bookLists', 'recdPageCnt', data);
  response.send(result);
});


// 베스트셀러 목록 (3개월 내 판매량 순)
bookListRouter.get("/bestlist/:pgno", async (request, response) => {
  let data = parseInt(request.params.pgno);
  let result = await db.connection('bookLists', 'bestSellerBookList', data);
  response.send(result);
});
// 베스트셀러 목록 페이징 (3개월 내 판매량 순)
bookListRouter.get("/bestlist", async (request, response) => {
  let result = await db.connection('bookLists', 'bestSellerPageCnt');
  response.send(result);
}); 


// // 신간도서 목록 (12개월 내 출판 날짜순)
// bookListRouter.get("/npubllist/:pgno", async (request, response) => {
//   let data = parseInt(request.params.pgno);
//   let result = await db.connection('bookLists', 'newPublBookList', data);
//   response.send(result);
// });
// // 신간도서 목록 페이징 (12개월 내 출판 날짜순)
// bookListRouter.get("/npubllist", async (request, response) => {
//   let result = (await db.connection('bookLists', 'newPublPageCnt'))[0];
//   response.send(result);
// });


// 분야별 인기도서 목록 (각 분야별 판매량 순)
bookListRouter.get("/catlist/:catcode", async (request, response) => {
  let data = request.params.catcode;
  let result = await db.connection('bookLists', 'categoryBookList', data);
  response.send(result);
});

// 함수
// function listSelect(listno) { // 목록 구분용 함수
//   switch (listno) {
//     case '1':
//       return 'ageLikeBookList';
//     case '2':
//       return 'bestSellerBookList';
//     case '3':
//       return 'newPublBookList';
//     case '4':
//       return 'categoryBookList';
//   } 
// }

module.exports = bookListRouter;