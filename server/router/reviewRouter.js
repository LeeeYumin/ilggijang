const express = require('express');
const reviewRouter = express.Router();
const db = require("../db.js");

// 도서 상세 리뷰 목록
reviewRouter.get("/rvlist/:pno/:odno/:pgno", async (request, response) => {
    let data = [request.params.pno, parseInt(request.params.odno), parseInt(request.params.pgno)];
    let result = await db.connection('reviews', 'detailReviewList', data);
    response.send(result);
});
reviewRouter.get("/rvlist/:pno", async (request, response) => {
    let data = request.params.pno;
    let result = await db.connection('reviews', 'detailReviewCnt', data);
    response.send(result);
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
reviewRouter.post("/", async (request, response) => {
    let data = request.body.rjson;
    let result = await db.connection('reviews', 'reviewInsert', data);
    response.send(result);
});

// 리뷰 수정
reviewRouter.put("/:rno", async (request, response) => {
    let data = [request.body.rjson, request.params.rno];
    let result = await db.connection('reviews', 'reviewUpdate', data);
    response.send(result);
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
    response.send(checkresult(data, result));
});
reviewRouter.get("/like/:rno", async (request, response) => {
    let data = parseInt(request.params.rno);
    let result = await db.connection('reviews', 'likeCnt', data);
    response.send(result);
});
function checkresult(data, result) {
    if (result == '') {
        let nos = { user_no: data[0], review_no: data[1] };
        let add = db.connection('reviews', 'likeInsert', nos); // insert값 반환
        return add;
    }
    else {
        let del = db.connection('reviews', 'likeDelete', data); // delete값 반환
        return del;
    };
};



module.exports = reviewRouter;