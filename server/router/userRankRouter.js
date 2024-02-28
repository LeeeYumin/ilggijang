const express =  require('express');
const userRankRouter = express.Router();
const db = require("../db.js");

// 회원등급 전체 조회
userRankRouter.get("/", async (request, response) => {
  result = await db.connection('userRank', 'userRankList');
  response.send(result);
});

// 함수

module.exports = userRankRouter;