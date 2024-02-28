require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
const bookRouter = require('./router/bookRouter.js'); // 각자 들어가는 부분

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query

app.use('/books', bookRouter);

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");
// REST API 기준

//전체조회
app.get("/", async (request, response) => {

});


