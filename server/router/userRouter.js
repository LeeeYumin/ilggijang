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

//로그인 
userRouter.get("/:id", async (request, response)=>{ //id pw 를 입력받아서 넘겨와야하는데 방법을 모름 더 찾아보고 정리해야됨.
    
})



//함수
module.exports = userRouter
     
