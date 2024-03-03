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
});

//로그인
userRouter.post('/login', (request, response, next)=>{
    const {id, pw_no} = request.body.param;
    //데이터베이스의 사용자가 테이블에서 로그인 인증 처리코드 작성
    //사용자가 존재하면 성공
    request.session.id = id;
    request.session.is_logined = true; // 로그인 여부저장
    request.session.save(err =>{ //세션에 저장
        if(err) throw err;
        response.redirect('/main'); //로그인후 메인화면으로
    });
});



//함수
module.exports = userRouter
     
