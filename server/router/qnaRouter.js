const express = require('express');
const qnaRouter = express.Router();
const db = require("../db.js");

// 도서 상세 QnA 목록
qnaRouter.get("/qnalist/:pno/:uno/:pgno", async (request, response) => {
    let data = [request.params.pno, parseInt(request.params.uno), parseInt(request.params.pgno)];
    let list = await db.connection('qnas', 'detailQnaList', data);
    let pages = await db.connection('qnas', 'detailQnaCnt', data[0]);
    response.send({list, pages});
});

// // 도서 상세 내 QnA 목록
// qnaRouter.get("/mqnalist/:uno/:pno", async (request, response) => {
//     let data = [parseInt(request.params.uno), request.params.pno];
//     let result = await db.connection('qnas', 'detailMyQnaList', data);
//     response.send(result);
// });

// 관리자 QnA 목록
qnaRouter.get("/admin", async (request, response) => {
    let result = await db.connection('qnas', 'adminQnaList');
    response.send(result);
});

// QnA 등록
qnaRouter.post("/", async (request, response) => {
    let data = request.body.rjson;
    let result = await db.connection('qnas', 'qnaInsert', data);
    response.send(result);
});

// QnA 단건상세 - 답변 완료시 조회 가능
qnaRouter.get("/:qano", async (request, response) => {
    let data = request.params.qano;
    let result = (await db.connection('qnas', 'qnaInfo', data))[0];
    response.send(result);
});

// QnA 수정 - 관리자 답변이 이미 있으면 수정 불가. 회원, 관리자 공통. 관리자 답변등록 및 수정까지 같이 사용
qnaRouter.put("/:qano", async (request, response) => {
    let data = [request.body, parseInt(request.params.qano)];
    let result = await db.connection('qnas', 'qnaUpdate', data);
    response.send(result);
});

// QnA 삭제 - 회원, 관리자 공통
qnaRouter.delete("/:qano", async (request, response) => {
    let data = request.params.qano;
    let result = await db.connection('qnas', 'qnaDelete', data);
    response.send(result);
});

module.exports = qnaRouter;