require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
// const session = require('express-session');




// 장효은
const userRankRouter = require('./router/userRankRouter.js'); // 회원등급 전체조회

// 도승민
const userRouter = require('./router/userRouter.js'); //회원 전체조회
const noticeRouter = require('./router/noticeRouter.js'); // 공지사항 조회
// 박지웅
const reviewRouter = require('./router/reviewRouter.js'); // 리뷰 관련 라우터 경로
const qnaRouter = require('./router/qnaRouter.js'); // 상품 문의(QnA) 라우터 경로
const qryRouter = require('./router/qryRouter.js'); // 회원, 배송&주문, 기타 문의 라우터 경로
const bookListRouter = require('./router/bookListRouter.js'); // 도서 목록 라우터 경로

// 신수지
const ordersRouter = require('./router/ordersRouter.js') // 주문
const cartRouter = require('./router/cartRouter.js') // 장바구니
const saveRouter = require('./router/saveRouter.js') // 찜

// 이유민
const bookRouter = require('./router/bookRouter.js'); // 상품

app.use( // json-parser
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({extended : false})); // query


// 장효은
app.use('/userranks', userRankRouter); // 회원등급 전체조회 (get방식), http://localhost:3000/userrank

// 도승민
app.use('/user', userRouter); //회원 전체조회 (get방식), http://localhost:3000/userList
app.use('/notice', noticeRouter); //공지사항 조회 (get방식), http://localhost:3000/noticeList

// 박지웅
app.use('/reviews', reviewRouter); // 리뷰 파라미터 워딩
app.use('/qnas', qnaRouter); // QnA 파라미터 워딩
app.use('/qrys', qryRouter); // 회원, 배송&주문, 기타 문의 파라미터 워딩
app.use('/bookLists', bookListRouter); // 도서 목록 파라미터 워딩

// 신수지
app.use('/orders', ordersRouter); // 주문
app.use('/cart', cartRouter); // 장바구니
app.use('/save', saveRouter); // 찜

// 이유민
app.use('/books', bookRouter); //책 검색결과 목록, 상세 (get방식)

app.listen(3000, () => {
  console.log("Server started. port 3000.");
});

const db = require("./db.js");

// REST API 기준

//전체조회
app.get("/", async (request, response) => {
  response.send('get방식 전송');
});

// 서버측 아임포트-토큰발급 + 결제단건 메소드
app.post("/complete", async (req, res) => {
  try {
    // req의 body에서 imp_uid추출
    // const { imp_uid } = req.body.param;
    const data = req.body.param;
    console.log(data)

    // 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, 
      data: {
        imp_key: "3584236023273102", // REST API 키
        imp_secret: "8du8ISTcXenIgm3sySvTzfhMMHFCVMf8McZ34XLagnYYzaLnGvVKxY1K1kLrtDlVerJ2kOel4lOUzPEQ" // REST API Secret
      }
    });
    console.log(getToken);
    // const { access_token } = getToken.data; // 인증 토큰
    // // imp_uid로 포트원 서버에서 결제 정보 조회
    // const getPaymentData = await axios({
    //   // imp_uid 전달
    //   url: `https://api.iamport.kr/payments/${imp_uid}`, 
    //   // GET method
    //   method: "get", 
    //   // 인증 토큰 Authorization header에 추가
    //   headers: { "Authorization": access_token } 
    // });
    
    // const paymentData = getPaymentData.data; // 조회한 결제 정보
    // console.log(paymentData);
  } 
  catch (e) {
    res.status(400).send(e);
  }
}); 

// let sessionSetting = session({
//   secret : 'Have$A!@Nice_day', // 하드코딩 X
//   resave : false,
//   saveUninitialized : true,
//   cookie : {
//       httpOnly : true, // 통신을 이용할 때만 해당 쿠키에 접근해서 정보를 가지고 올 수 있도록
//       secure : false, // secure : 보안이 강화된 곳에서만 사용할 수 있도록?
//       maxAge : 60000 // 밀리세컨드
//   }
// });

// app.use(sessionSetting);


// app.post('/login', (request, response, next)=>{
//   const {id, pw_no} = request.body.param;
//   //데이터베이스의 사용자가 테이블에서 로그인 인증 처리코드 작성

//   //사용자가 존재하면 성공
//   request.session.id = id;
//   request.session.pw_no = pw_no;
//   request.session.is_logined = true; // 로그인 여부저장
//   request.session.save(err =>{ //세션에 저장
//       if(err) throw err;
//       console.log('세션저장성공');
//       //response.redirect('/main'); //로그인후 메인화면으로
//       response.send(id, pw_no);
//   });
// });