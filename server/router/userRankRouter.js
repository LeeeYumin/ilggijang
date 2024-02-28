const express =  require('express');
const userRankRouter = express.Router();
const db = require("../db.js");

// 회원등급 전체 조회
userRankRouter.get("/", (request, response) => {
  let result = db.connection('userRank', 'userRankList').then(rlt => {console.log(rlt)}).catch(err=>{console.log(err)});
  response.send(result);
});

// 함수

module.exports = userRankRouter;