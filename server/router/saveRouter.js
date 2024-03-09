const express =  require('express');
const saveRouter = express.Router();
const db = require("../db.js");

// 찜목록
saveRouter.get("/", async (request, response) => {
    let result = await db.connection('save', 'saveList');
    response.send(result);
});

// 찜등록 
saveRouter.post("/", async (request, response) => {
    let data = request.body.param;
    let result = await db.connection('save', 'saveInsert', data);
    response.send(result);
});

// 찜삭제
saveRouter.delete("/:pno", async (request, response) => {
    let data = request.params.pno;
    console.log(data);
    let result = await db.connection('save', 'saveDelete', data);
    response.send(result);
});

// 함수

module.exports = saveRouter;