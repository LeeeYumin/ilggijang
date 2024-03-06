const express = require('express');
const userRouter = express.Router();
const db = require('../db.js');
// const session = require('express-session');


// let sessionSetting = session({
//     secret : 'Have$A!@Nice_day', // 하드코딩 X 
//     resave : false,
//     saveUninitialized : true,
//     cookie : {
//         httpOnly : true, // 통신을 이용할 때만 해당 쿠키에 접근해서 정보를 가지고 올 수 있도록
//         secure : false, // secure : 보안이 강화된 곳에서만 사용할 수 있도록?
//         maxAge : 60000 // 밀리세컨드
//     }
// });

// userRouter.use(sessionSetting);

//회원조회
userRouter.get("/", async (request, response) =>{
    let result = await db.connection('user','userList');
    response.send(result);
});
//회원가입
userRouter.post("/", async (request, response)=>{
    let data = request.body.param;
    console.log(data);
    let result = await db.connection('user', 'userJoin', data).then(res=>{
        console.log(res)
    })
    .catch(err => console.log(err));
    response.send(result);
});

//회원단건 조회
userRouter.get("/:user_no", async (request, response)=>{
    let data = request.params.user_no;
    let result = (await db.connection('user','userInfo', data))[0];
    response.send(result);
});

//회원단건 조회 : id 기준
userRouter.get("/:uid", async (request, response)=>{
    let data = request.params.uid;
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
    request.session.pw_no = pw_no;
    request.session.is_logined = true; // 로그인 여부저장
    request.session.save(err =>{ //세션에 저장
        if(err) throw err;
        console.log('세션저장성공');
        //response.redirect('/main'); //로그인후 메인화면으로
        response.send('성공');
    });
    
});





//함수
module.exports = userRouter
     
