require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();

// 장효은
const userRankRouter = require('./router/userRankRouter.js'); // 회원등급 전체조회

// 도승민
const userRouter = require('./router/userRouter.js'); //회원 전체조회

// 박지웅


// 신수지
const ordersRouter = require('./router/ordersRouter.js') // 주문 전체조회

// 이유민
const bookRouter = require('./router/bookRouter.js'); // 상품

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query


// 장효은
app.use('/userrank', userRankRouter); // 회원등급 전체조회 (get방식), http://localhost:3000/userrank

// 도승민
app.use('/user', userRouter); //회원 전체조회 (get방식), http://localhost:3000/userList
// 박지웅


// 신수지
app.use('/orders', ordersRouter); // 주문

// 이유민
app.use('/books', bookRouter);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");

// REST API 기준

//전체조회
app.get("/", async (request, response) => {
  response.send('get방식 전송');
});


