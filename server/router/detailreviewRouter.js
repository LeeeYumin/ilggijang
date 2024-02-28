const express = require('express');
const detailreviewRouter = express.Router();
const db = require("../db.js");

// 리뷰 목록
detailreviewRouter.get("/", async (request, response) => {
    let result = await db.connection('detailreview', 'reviewList');
    response.send(result);
});
// 리뷰 단건
detailreviewRouter.get("/:no", async (request, response) => {
    let data = request.params.no;
    let result = (await db.connection('detailreview', 'reviewList', data))[0];
    response.send(result);
});
// 리뷰 등록
detailreviewRouter.post("/", async (request, response) => {
    let data = request.body.jsons;
    let result = await db.connection('detailreview', 'reviewInsert', data);
    response.send(result);
});
// 리뷰 수정
detailreviewRouter.put("/:no", async (request, response) => {
    let data = [request.body.jsons, request.params.no];
    let result = await db.connection('detailreview', 'reviewUpdate', data);
    response.send(result);
});
// 리뷰 삭제
detailreviewRouter.delete("/:no", async (request, response) => {
    let data = request.params.no;
    let result = await db.connection('detailreview', 'reviewDelete', data);
    response.send(result);
});


module.exports = detailreviewRouter;