const express =  require('express');
const userRankRouter = express.Router();
const db = require("../db.js");

// 회원등급 전체 조회
userRankRouter.get("/", async (request, response) => {
  let result = await db.connection('userranks', 'userRankList');
  response.send(result);
});

// 회원등급 단건 조회
userRankRouter.get("/:uno", async (request, response) => {
  let data = request.params.uno;
  let result = (await db.connection('userranks', 'userRankInfo', data))[0];
  response.send(result);
});

// 함수

module.exports = userRankRouter;