require("dotenv").config({ path: "./db/db.env" });
const express = require("express");
const app = express();
// const session = require('express-session');
const axios = require('axios');




// 장효은
const userRankRouter = require('./router/userRankRouter.js'); // 회원등급 전체조회
const fileRouter = require('./router/fileRouter.js'); // 파일 등록

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
const ordersdetailRouter = require('./router/ordersdetailRouter.js') // 주문상세
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
app.use('/files', fileRouter); // 파일업로드

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
app.use('/ordersdetail', ordersdetailRouter); // 주문
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
    const { imp_uid } = req.body; // req의 body에서 imp_uid추출
    /** 클라이언트 쪽에서 들어와야 할 body
    {
      "imp_uid" : "imp_427462517173",
      "merchant_uid" : "merchant_1709556462172"
    }
    */

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
    // console.log(getToken);
    console.log(getToken.data.response.access_token); // 인증 토큰

    // 인증 토큰
    let accessToken = getToken.data.response.access_token;

    // imp_uid로 포트원 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      // imp_uid 전달
      url: `https://api.iamport.kr/payments/${imp_uid}`, 
      // GET method
      method: "get", 
      // 인증 토큰 Authorization header에 추가
      headers: { "Authorization": accessToken } 
    });
    
    const paymentData = getPaymentData.data; // 조회한 결제 정보
    console.log(paymentData);
    console.log(paymentData.response);

    res.send(paymentData.response); // 클라이언트쪽에 결제 상태값을 응답해줌
  } 
  catch (e) {
    res.status(400).send(e);
  }
}); 

app.post("/afterpay", async (req, res) => {
  let result = {};
  let conn = await db.getConnect(); // DB연결 시작
  try {

    // console.log("----------------들어오는 요청--------", req)
    let orderData = req.body.data.orderInfo;
    console.log("주문 들어오는 값", orderData)

    await db.trsConnection(conn, 'START TRANSACTION'); // 트랜잭션 시작
      // 주문 입력
      let orderResult = await db.sqlConnection(conn, 'orders', 'orderInsert', orderData);
      console.log('주문결과==============', orderResult);

      // 주문 상세 입력
      let orderDetailData = req.body.data.orderDetailInfo.selectList; // sessionStoeage {[],[]}
      console.log('*********주문상세젭알', orderDetailData);
      let orderNo = orderResult.insertId; // 주문번호
      console.log('*********주문번호', orderNo)

      let resultData = []; // DB에 보낼 데이터
      
      // 수량, 상품번호, 단가, 주문번호
      let qua = 0;
      let pno = '';
      let perPrice = 0;

      for(let i = 0; i < orderDetailData.length; i++){
        qua = orderDetailData[i].quantity;
        pno = orderDetailData[i].book_no;
        perPrice = orderDetailData[i].book_price;
        resultData.push([qua, pno, perPrice, orderNo]);
        // 3개씩 될때 다시 배열에 담아줘야함
      }


      // 합치기 
      console.log('잘들어오니?', orderDetailData)
      let orderDetailResult = await db.sqlConnection(conn, 'ordersdetail', 'orderDetailInsert', [resultData]).catch(err => console.log(err));
      console.log('주문상세결과==============',orderDetailResult);
    
      // 바로 구매의 경우 카트번호가 없음!
      // 카트번호 유무로 구분해야할듯 카트삭제를 진행 할지 말지 결정해야함

      // 카트 삭제
      let cartInfo = req.body.data.cartInfo.user_no;
      console.log(cartInfo);
      let cartInfoResult = await db.sqlConnection(conn, 'cart', 'cartPickDelete', cartInfo);
      console.log('장바구니 삭제==============', cartInfoResult);

    await db.trsConnection(conn, 'COMMIT'); // 커밋

    result = {
      orderResult,
      orderDetailResult,
      cartInfoResult
    }
    res.send(result); // 클라이언트에게 결과전송
  }catch(err) {
    console.log('에러발생')
    await db.trsConnection(conn, 'ROLLBACK'); // 롤백
  }finally{
    conn.release();
  }
});