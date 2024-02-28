require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();

// 장효은
const userRankRouter = require('./router/userRankRouter.js'); // 회원등급 전체조회

// 도승민


// 박지웅


// 신수지


// 이유민

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query

// 장효은
app.use('/userrank', userRankRouter); // 회원등급 전체조회 (get방식), http://localhost:3000/userrank

// 도승민


// 박지웅


// 신수지


// 이유민

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");
// REST API 기준

//전체조회
app.get("/", async (request, response) => {
  response.send('get방식 전송');
});
