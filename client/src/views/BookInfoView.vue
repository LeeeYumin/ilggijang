<template>
  <!--도서상세화면-->
  <div class="container">
    <div class="top">
      <p class="category">{{ category(bookInfo.category_code) }}</p>
      <h3>{{ bookInfo.book_name }}</h3>
    </div>
    <div class="book_info_box">
      <div class="left">
        <span class="img">
            <img :src="require('@/assets/product/' + bookInfo.book_img)" alt="cover">
        </span>
      </div>
      <div class="right">
        <div class="book_info">
          <p><i>저자</i> {{ bookInfo.title }} </p>
          <p><i>ISBN</i> {{ bookInfo.isbn }} </p>
        </div>
        <div class="book_info">
          <p><i>출판사</i> {{ bookInfo.publ_co }}</p>
          <p><i>가격</i> {{ formatPrice(bookInfo.book_price) }}</p>
          <p><i>출간일</i> {{ publDate }}</p>
        </div>
        <div class="btn">
          <button type="button" @click="goCart(this.bno)"><span><font-awesome-icon icon="fa-solid fa-cart-shopping" size="sm" /> 장바구니</span></button>
          <button type="button" @click="goLike(this.bno)"><span><font-awesome-icon icon="fa-solid fa-heart" size="sm" /> 찜</span></button>
          <!--@click="methods이름(this.받는값)" 추가-->
        </div>
      </div>
    </div>

    <div class="botton">
        <div class="detailDown">
        <p>{{ bookInfo.detail_exp }}</p>
      </div>
    </div>
    <BookReviewView />
    <BookQnaView />
  </div>
</template>

<script>
import axios from 'axios';
import BookReviewView from '../views/BookReviewView.vue';
import BookQnaView from '../views/BookQnaView.vue';

export default {
  components: {
    BookReviewView,
    BookQnaView
  },
  data() {
    return {
      bookInfo: {
        isbn: '',
        book_name: '',
        book_img: '',
        title: '',
        publ_co: '',
        book_price: '',
        detail_exp: '',
        publ_date: null,
        category_code: ''
      },
      cartAlert: false,
      //existCart : false
    }
  },
  computed: {
    publDate() {
      let result = null;
      if (this.bookInfo.publ_date != null) {
        let date = new Date(this.bookInfo.publ_date);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        result = `${year}년 ${month}월 ${day}일`;
      }
      return result;
    }
  },
  created() {
    let bno = this.$route.query.bookNo; // 넘겨받은 책 번호
    this.getBookInfo(bno) // 클릭이벤트 관련 created() 임
  },
  methods: {
    async getBookInfo(bno) {
      let result = await axios.get('/api/books/' + bno) // 기존 BK000001 에서 받는값(bno)으로 변경
        .catch(err => console.log(err));
      console.log(result);
      this.bookInfo = result.data;
    },
    formatPrice(book_price) {
      if (book_price > 999) {
        let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
        let idx = 0;
        while (priceAry.length > idx + 3) {
          priceAry.splice(idx + 3, 0, ',');
          idx += 4;
        }
        return priceAry.reverse().join('') + '원'  //reverse 함수임
      } else {
        return book_price + '원'
      }
    },
    goCart() { //(bno)
      console.log('책정보', this.bookInfo);
      if (this.$store.state.isLogin) {
        this.addCart()
      } else {
        alert("로그인 후 이용해주세요")
      }
    },
    async addCart() { // *중복체크 + 담기
      let uno = this.$store.state.userNo;
      let pno = this.bookInfo.prdt_no;
      // 장바구니 중복체크
      await axios.get("/api/cart/cartCheck?uno=" + uno + "&pno=" + pno)
        .then(result => {
          console.log("=======", result.data);
          if (result.data) {
            this.cartInsert();// 장바구니에 추가
          } else {
            alert("이미 담긴 도서입니다")
          }
        })
        .catch(err => console.log(err));
    },
    async cartInsert() {
      let data = {
        param: {
          quantity: 1,
          user_no: this.$store.state.userNo,
          prdt_no: this.bookInfo.prdt_no
        }
      }
      let result = await axios.post("/api/cart", data)
        .catch(err => console.log(err));
      let info = result.data.insertId;
      if (info > 0) {
        alert("장바구니에 추가되었습니다")
        this.$router.push({ path: '/cart' }); // 클릭이벤트 추가. query 지움
      }
    },
    category(category) {
      let result = '';
      switch(category) {
        case 'c01': 
          result = '소설';
          break;
        case 'c02':
          result = '시/에세이';
          break;
        case 'c03':
          result = '인문';
          break;
        case 'c04':
          result = '가정/육아';
          break;
        case 'c05':
          result = '경제/경영';
          break;
        case 'c06':
          result = '자기계발';
          break;
        case 'c07':
          result = '역사/문화';
          break;
        case 'c08':
          result = '예술/대중문화';
          break;
        case 'c09':
          result = '외국어';
          break;
        case 'c10':
          result = '과학';
          break;
        case 'c11':
          result = '취업/수험서';
          break;
        case 'c12':
          result = '여행';
          break;
        case 'c13':
          result = '컴퓨터/IT';
          break;
        case 'c14':
          result = '청소년';
          break;
         case 'c15':
          result = '어린이(초등)';
          break;
        }
        return result;
      },
      goLike() { //(bno)
        console.log('책정보', this.bookInfo);
        if (this.$store.state.isLogin) {
          this.addLike()
        } else {
          alert("로그인 후 이용해주세요")
        }
      },
    async addLike() { // *중복체크 + 담기
      let uno = this.$store.state.userNo;
      let pno = this.bookInfo.prdt_no;
      // 찜 중복체크
      await axios.get("/api/save/like/check?uno=" + uno + "&pno=" + pno)
        .then(result => {
          console.log("=======", result.data);
          if (result.data) {
            this.saveInsert();// 찜에 추가
            alert('찜에 추가되었습니다.')
          } else {
            alert("이미 담긴 도서입니다.")
          }
        })
        .catch(err => console.log(err));
    },
    async saveInsert() {
      let data = {
        param: {
          user_no: this.$store.state.userNo,
          prdt_no: this.bookInfo.prdt_no
        }
      }
      let result = await axios.post("/api/save", data)
        .catch(err => console.log(err));
      let info = result.data.insertId; // 찜에 insert
      if (info > 0) {
        alert("찜에 추가되었습니다")
        this.$router.push({ path: '/save' }); // 클릭이벤트 추가
      }
    },
  }
}

</script>

<style scoped>
.container{padding-top:50px;}
.top{text-align:center;}
h3{width:70%; margin:0 auto; text-align:center; font-weight:700; letter-spacing:-1px; word-break:keep-all;}
p.category{display:inline-block; padding:2px 20px; border:1px solid #ccc; border-radius:50px; margin-bottom:10px; color:#555; font-size:15px; font-weight:500;}
.book_info_box{display:flex; justify-content:center; padding:30px; box-sizing:border-box;}
.left .img{display:block; width:200px; height:293px; background:#ccc; box-shadow:0 0 5px 2px rgba(0, 0, 0, 0.1);}
.left .img img{display:block; width:100%; height:100%;}
.right{position:relative; width:500px; margin-left:40px; padding-bottom:80px; border-top:1px solid #ddd;}
.right p{margin:0; padding:15px 20px; font-size:16px; letter-spacing:-0.5px; border-bottom:1px dashed #ddd;}
.right p i{display:inline-block; width:70px; font-style:normal; color:#555; font-size:15px; font-weight:700;}
.btn{position:absolute; right:0; bottom:0; padding:0; margin:0;}
.btn button{border:0; background:none;}
.btn button:first-child span{background:#3a4ca8; color:#fff;}
.btn button span{display:inline-block; width:140px; color:#3a4ca8; font-size:15px; letter-spacing:-0.5px; border:1px solid #3a4ca8; padding:12px 10px; border-radius:5px;}
.botton{margin-top:30px; padding-bottom:55px; border-bottom:1px solid #ddd;}
.detailDown{padding:50px; background:#f5f5f5; border-radius:15px; box-sizing:border-box;}
.detailDown p{margin-bottom:5px; font-size:15px; letter-spacing:-0.5px;}
</style>