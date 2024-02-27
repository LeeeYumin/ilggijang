const express =  require('express');
const bookRouter = express.Router();
const db = require("../db.js");

// 전체 조회
bookRouter.get("/", async (request, response) => {
  
});

module.exports = bookRouter;