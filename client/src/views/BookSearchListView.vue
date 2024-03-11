<template>
  <!--도서검색하면 처음 뜨는 목록-->
  <div class="container serach_con">
    <h4><span>'{{ book_name }}'</span>에 대한 검색 결과</h4>
    <div class="list">
        <div class="selected" :key="i" v-for= "(book, i) in bookSearchList">
          <div class="left" @click="goDetailBook(book.prdt_no)">
            <span class="img">
              <img :src="getImgUrl(book.book_img)" alt="cover">
            </span>
          </div>
           <ul class="prdt_list">
              <li class="tit">{{ book.book_name }}</li>
              <li>{{ book.title }}</li>
              <li>{{ publDate(book.publ_date) }}</li>
              <li><i class="point">{{ formatPrice(book.book_price) }}원</i></li>
            </ul>
          <div class="right">
            <button type="button" class="btn btn-primary" @click="goCart(book.prdt_no)">장바구니</button>
            <button type="button" class="btn btn-secondary" @click="goLike(book.prdt_no)">찜</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Search from '../layouts/headers/SearchView.vue';
import axios from 'axios';

export default {
  name : "bookSearch",
  searchList : 'searchList',
  // components : {
  //   Search
  // },
  data() {
    return{
      bookSearchList: [ ], //결과를 담는 배열
      book_name : this.$route.query.book_name //history.state.book_name. 검색어 수정 전 : this.$route.params.text
    }
  },
  created(){
    this.book_name = this.$route.query.book_name; // 넘겨받은 책 번호
    this.getBookSearchList()
    //this.getBookSearchList(bno), // 클릭이벤트 관련 created() 임
    //console.log(this.$route.params.book_name);
    this.$watch(
      () => this.$route.query,
      () => {
        if (this.$route.query.book_name){
          this.bookName = this.$route.query.book_name;
          this.getBookSearchList()
        }else {
          this.bookName = '';
        }
      }
    )
  },
  methods : {
    async getBookSearchList(){
      let result = await axios.get('/api/books/search/'+ this.$route.query.book_name)
                              .catch(err => console.log(err));
      console.log(result);
      this.bookSearchList = result.data;
    },
    publDate(publ_date) { // computed는 값 1개일때 쓰기. 이 경우는 methods에 넣기 (for문)
      let result = null;
      if(publ_date != null){
          let date = new Date(publ_date);
          let year = date.getFullYear();
          let month = ('0' + (date.getMonth() + 1)).slice(-2);
          let day = ('0' + date.getDate()).slice(-2);
          result = `${year}년 ${month}월 ${day}일`;
        }
      return result;
    },
    formatPrice(book_price) {
      if (book_price > 999) {
        let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
        let idx = 0;
        while (priceAry.length > idx + 3) {
          priceAry.splice(idx + 3, 0, ',');
          idx += 4;
        }
        return priceAry.reverse().join('') //reverse 함수임
      } else {
        return book_price + '원'
      }
    },
    goCart(prdt_no) { //(bno)
      //console.log('책정보', bno);
      if(this.$store.state.isLogin){
          this.addCart(prdt_no)
      }else{
        alert("로그인 후 이용해주세요")
      }
    },

    async addCart(prdt_no){ // *중복체크 + 담기
      let uno = this.$store.state.userNo;
      // let pno = this.book.prdt_no;
      // 장바구니 중복체크
      await axios.get("/api/cart/cartCheck?uno="+ uno + "&pno=" + prdt_no)
                  .then(result=>{
                    console.log("=======", result.data);
                    if(result.data){
                      this.cartInsert(prdt_no);// 장바구니에 추가
                    }else{
                      alert("이미 담긴 도서입니다")
                    }
                  })
                  .catch(err => console.log(err));
    },
    async cartInsert(prdt_no){
      let data = {
        param : {
          quantity : 1,
          user_no : this.$store.state.userNo,
          prdt_no : prdt_no
        }
      }
      let result = await axios.post("/api/cart", data)
                              .catch(err => console.log(err));
      let info = result.data.insertId;
      if(info > 0) {
        alert("장바구니에 추가되었습니다")
        this.$router.push({path : '/cart'}); // 클릭이벤트 추가. query 지움
      }
    },
    goDetailBook(bno) { // 이미지 클릭하면 상세화면으로.
      this.$router.push({ path : '/book', query : { 'bookNo' : bno }});
    },
    goLike(prdt_no) { //(bno)
      //console.log('책정보', bno);
      if(this.$store.state.isLogin){
          this.addLike(prdt_no)
      }else{
        alert("로그인 후 이용해주세요")
      }
    },
    async addLike(prdt_no){ // *중복체크 + 담기
      let uno = this.$store.state.userNo;
      // let pno = this.book.prdt_no;
      // 장바구니 중복체크
      await axios.get("/api/save/like/check?uno="+ uno + "&pno=" + prdt_no)
      .then(result=>{
        console.log("=======", result.data);
        if(result.data){
          this.saveInsert(prdt_no);// 찜에 추가
          alert('찜에 추가되었습니다.')
        }else{
          alert("이미 담긴 도서입니다")
        }
      })
      .catch(err => console.log(err));
    },
    async saveInsert(prdt_no){
      let data = {
        param : {
          user_no : this.$store.state.userNo,
          prdt_no : prdt_no
        }
      }
      let result = await axios.post("/api/save", data)
                              .catch(err => console.log(err));
      let info = result.data.insertId;
      if(info > 0) {
        alert("찜에 추가되었습니다")
        this.$router.push({path : '/save'}); // 클릭이벤트 추가
      }
    },
    getImgUrl(imgName) { // 이미지 동적으로 가져오기
      return new URL(`/product/${imgName}`, 'http://localhost:8081');
    }
  }
      }

</script>

<style scope>
.serach_con{min-height:700px;}
h4{padding-top:3rem; text-align:center; font-size:1.75rem !important; font-weight:700 !important; letter-spacing:-1px;}
h4 span{color:#3a4ca8;}
.list{margin-top:30px; margin-bottom:50px;  border-top:1px solid #111;}
.list .selected{position:relative; padding:30px 20px; border-bottom:1px solid #ddd; box-sizing:border-box;}
.prdt_list{list-style:none; padding-left:0;}
.selected .left{float:left;}
.selected .img{display:inline-block; width:130px; height:178px; box-shadow:0 0 5px 2px rgba(0, 0, 0, 0.1); cursor:pointer;}
.selected .img img{display:block; width:100%; height:100%;}
.selected .prdt_list{display:inline-block; margin-top:10px; margin-left:20px; margin-bottom:0; color:#555; font-size:15px; letter-spacing:-0.5px;}
.selected .prdt_list li{margin-bottom:5px;}
.selected .prdt_list .tit{color:#111; font-size:16px; font-weight:700;}
.selected .right{position:absolute; right:20px; top:50%; margin-top:-40.5px;}
.selected .right button{display:block; width:100px; margin-right:0;}
.selected .right button:last-child{margin-top:5px;}
.selected:after{content:''; display:block; clear:both;}
.point{font-style:normal; font-weight:700;}
</style>