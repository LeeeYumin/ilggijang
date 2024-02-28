const express = require('express');
const userRouter = express.Router();
const db = require('../db.js');

//회원조회
userRouter.get("/", async (request, response) =>{
    result = await db.connection('user','userList');
    response.send(result);
});
//회원가입
userRouter.post("/", async(request, response)=>{
    result = await db.connection('user', 'userJoin');
    response.send(result);
})



//함수
module.exports = userRouter
     
