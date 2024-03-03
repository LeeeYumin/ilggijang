require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();

// 장효은
const userRankRouter = require('./router/userRankRouter.js'); // 회원등급 전체조회

// 도승민
const userRouter = require('./router/userRouter.js'); //회원 전체조회
const noticeRouter = require('./router/noticeRouter.js'); // 공지사항 조회
// 박지웅
const reviewRouter = require('./router/reviewRouter.js'); // 리뷰 관련 라우터 경로
const qnaRouter = require('./router/qnaRouter.js'); // 상품 문의(QnA) 라우터 경로
const qryRouter = require('./router/qryRouter.js'); // 회원, 배송&주문, 기타 문의 라우터 경로

// 신수지
const ordersRouter = require('./router/ordersRouter.js') // 주문
const cartRouter = require('./router/cartRouter.js') // 장바구니
const saveRouter = require('./router/saveRouter.js') // 찜

// 이유민
const bookRouter = require('./router/bookRouter.js'); // 상품

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query


// 장효은
app.use('/userranks', userRankRouter); // 회원등급 전체조회 (get방식), http://localhost:3000/userrank

// 도승민
app.use('/user', userRouter); //회원 전체조회 (get방식), http://localhost:3000/userList
app.use('/notice', noticeRouter); //공지사항 조회 (get방식), http://localhost:3000/noticeList

// 박지웅
app.use('/reviews', reviewRouter); // 리뷰 파라미터 워딩
app.use('/qnas', qnaRouter); // QnA 파라미터 워딩
app.use('/qrys', qryRouter); // 회원, 배송&주문, 기타 문의 파라미터 워딩

// 신수지
app.use('/orders', ordersRouter); // 주문
app.use('/cart', cartRouter); // 장바구니
app.use('/save', saveRouter); // 찜

// 이유민
app.use('/books', bookRouter); //책 검색결과 상세 (get방식)
// 책 검색결과 목록 (get방식)

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");

// REST API 기준

//전체조회
app.get("/", async (request, response) => {
  response.send('get방식 전송');
});


