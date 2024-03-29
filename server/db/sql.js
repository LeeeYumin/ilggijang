
// 장효은
const userranks = require('./userranks.js'); // 회원등급 sql문
const file = require('./file.js'); // 회원등급 sql문

// 도승민
const user = require('./user.js'); // 회원 리스트 sql문
const notice = require('./notice.js'); //공지사랑 리스트 sql문

// 박지웅
const reviews = require('./reviews.js'); // 리뷰 sql문
const qnas = require('./qnas.js'); // QnA sql문
const qrys = require('./qrys.js'); // 회원, 배송&주문, 기타 문의 sql문
const bookLists = require('./bookLists.js'); // 도서 목록 sql문

// 신수지
const orders = require('./orders.js'); // 주문 sql문
const ordersdetail = require('./ordersdetail.js'); // 주문상세 sql문
const cart = require('./cart.js') // 장바구니 sql문
const save = require('./save.js') // 찜 sql문

// 이유민
const books = require('./books.js'); // 상품 sql문
const product = require('./product.js'); // 상품 sql문



module.exports = {
    // 장효은
    userranks
    , file

    // 도승민
    , user
    ,notice


    // 박지웅
    , reviews
    , qnas
    , qrys
    , bookLists

    // 신수지
    , orders
    , ordersdetail
    , cart
    , save

    // 이유민
    , books
    , product
}