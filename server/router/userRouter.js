const express = require('express');
const userRouter = express.Router();
const db = require('../db.js');

//회원조회
userRouter.get("/", async (request, response) =>{
    result = await db.connection('user','userList');
    response.send(result);
});
//회원가입
userRouter.post("/",(request, response)=>{
    let data = request.body.param;
    console.log(data);
    let result =  db.connection('user', 'userJoin',data).then(rlt => {console.log(rlt)}).catch(err=>{console.log(err)});
    response.send(result);
});

//회원단건 조회
userRouter.get("/:user_no", async (request, response)=>{
    let data = request.params.user_no;
    let result = (await db.connection('user','userInfo', data))[0];
    response.send(result);
});
//회원정보 수정
userRouter.put("/:uno", async(request, response)=>{
    let data = [request.body.param, request.params.uno];
    let result = await db.connection('user', 'userUpdate', data);
    response.send(result);
})



//함수
module.exports = userRouter
     
