const express = require('express');
const noticeRouter = express.Router();
const db = require('../db.js');

//공지사항 조회
noticeRouter.get("/", async (request, response) =>{
    let result = await db.connection('notice', 'noticeList');
    response.send(result);
});

// 공지사항 등록
noticeRouter.post("/", async (request,response) =>{
    let data = request.body.param;
    
    let result = await db.connection('notice', 'noticeInsert', data);
    response.send(result);
});

//공지사항 수정
noticeRouter.put("/:notice_no", async (request, response)=>{
    let data = [request.body.param, request.params.notice_no];
    let result = await db.connection('notice', 'noticeUpdate',data);
    response.send(result);
});
// 공지사항 단건조회 키값은 공지사항번호(where절에 들어감)
noticeRouter.get("/:notice_no", async (request, response)=>{
    let data = request.params.notice_no;
    let result = (await db.connection('notice','noticeInfo', data))[0];
    response.send(result);
});

//공지사항 삭제
noticeRouter.delete("/:notice_no",async (request, response)=>{
    let data = request.params.notice_no;
    let result = (await db.connection('notice','deleteInfo', data))[0];
    response.send(result);
})

//함수
module.exports = noticeRouter;