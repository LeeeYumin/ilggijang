const express = require('express');
const reviewRouter = express.Router();
const db = require("../db.js");

// 도서 상세 리뷰 목록
reviewRouter.get("/rvlist/:pno/:odno/:pgno", async (request, response) => {
    let data = [request.params.pno, parseInt(request.params.odno), parseInt(request.params.pgno)];
    let list = await db.connection('reviews', 'detailReviewList', data);
    let pages = await db.connection('reviews', 'detailReviewCnt', data[0]);
    let res = {list, pages};
    response.send(res);
});

// 도서 상세 내 리뷰 목록
reviewRouter.get("/mrvlist/:uno/:pno", async (request, response) => {
    let data = [parseInt(request.params.uno), request.params.pno];
    let result = await db.connection('reviews', 'detailMyReviewList', data);
    response.send(result);
});


// 관리자 리뷰 목록
reviewRouter.get("/admin", async (request, response) => {
    let result = await db.connection('reviews', 'adminReviewList');
    response.send(result);
});


// 리뷰 등록
// reviewRouter.post("/", async (request, response) => {
//     let data = request.body.rjson;
//     let result = await db.connection('reviews', 'reviewInsert', data);
//     response.send(result);
// });

// 리뷰 수정 (수정된 행이 없으면 등록 실행)
reviewRouter.put("/:rno", async (request, response) => {
    let data = [request.body, parseInt(request.params.rno)]; 
    let update = await db.connection('reviews', 'reviewUpdate', data);
    if(update.changedRows == 0){
        await db.connection('reviews', 'reviewInsert', data[0]);
    }
    response.send(update);
});

// 리뷰 삭제
reviewRouter.delete("/:rno", async (request, response) => {
    let data = request.params.rno;
    let result = await db.connection('reviews', 'reviewDelete', data);
    response.send(result);
});

// 좋아요 추가 삭제
reviewRouter.get("/like/:uno/:rno", async (request, response) => { // DB에서 일치값 찾기
    let data = [parseInt(request.params.uno), parseInt(request.params.rno)];
    let result = await db.connection('reviews', 'likeCheck', data);
    checkresult(data, result, response);
});

async function checkresult(data, result, response) {
    if (result == '') {
        let nos = { user_no: data[0], review_no: data[1] };
        await db.connection('reviews', 'likeInsert', nos); // 추가
    }
    else {
        await db.connection('reviews', 'likeDelete', data); // 삭제
    };
    let cnt = (await db.connection('reviews', 'likeCnt', data[1]))[0]; // 좋아요 수
    response.send(cnt);
};



module.exports = reviewRouter;