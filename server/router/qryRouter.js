const express = require('express');
const qryRouter = express.Router();
const db = require("../db.js");

// 1:1문의 목록 조회
// qryRouter.get("/", async (request, response) => {
//     let result = await db.connection('qrys', '');
//     response.send(result);
// });

// 관리자 1:1문의 목록
qryRouter.get("/admin", async (request, response) => {
    let result = await db.connection('qrys', 'adminQryList');
    response.send(result);
});

// // 문의 등록
// qryRouter.post("/", async (request, response) => {
//     let data = request.body.json;
//     let result = await db.connection('qrys', '', data);
//     response.send(result);
// });

// // 문의 단건상세
// qryRouter.get("/:qrno", async (request, response) => {
//     let data = request.params.qrno;
//     let result = (await db.connection('qrys', '', data))[0];
//     response.send(result);
// });

// // 문의 수정
// qryRouter.put("/:qrno", async (request, response) => {
//     let data = [request.body.json, request.params.qrno];
//     let result = await db.connection('qrys', '', data);
//     response.send(result);
// });

// // 문의 삭제 - 회원, 관리자 공통
// qryRouter.delete("/:qrno", async (request, response) => {
//     let data = request.params.qrno;
//     let result = await db.connection('qrys', '', data);
//     response.send(result);
// });

module.exports = qryRouter;