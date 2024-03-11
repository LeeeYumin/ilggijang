const express =  require('express');
const productRouter = express.Router();
const db = require("../db.js");

// 전체 조회 (관리자)
productRouter.get("/", async (request, response) => {
  let result = await db.connection('product', 'productList');
  response.send(result);
});

// 단건 조회 (관리자)
productRouter.get("/:pno", async (request, response) => { //:prdt_no 에서 수정
  let data = request.params.pno;
  let result = (await db.connection('product', 'productDetailInfo', data))[0];
  response.send(result);
});

// 상품관리 입력 (관리자)
// productRouter.post("/", async (request, response) => {
//   let data = request.body.param;
//   let result = await db.connection('product', 'productInsert', data);
//   response.send(result);
// });

// 상품관리 입력 (관리자) -> 사용중
productRouter.post("/", async (request, response) => {
  let dataAry = request.body.param;

  let result = await db.connection('product', 'prdtInsert', dataAry).catch(err=>console.log(err));
  response.send(result);
});

// 상품관리 수정 (관리자)
productRouter.put("/:pno", async (request, response) => {
  let data = [request.body.param, request.params.pno];
  let result = await db.connection('product', 'productUpdate', data);
  response.send(result);
});

// 상품관리 삭제 (관리자)
productRouter.delete("/:pno", async (request, response) => {
  let data = request.params.pno;
  let result = await db.connection('product', 'productDelete', data);
  response.send(result);
});

// 함수

module.exports = productRouter;