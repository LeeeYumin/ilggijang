<template>
  <div class="container">
    <h4> '{{ book_name }}' 에 대한 검색 결과</h4>
    <div class="row">
      <div class="result">
        <div class="selected" :key="i" v-for= "(book, i) in bookSearchList">
          <div class="left" @click="goDetailBook(book.prdt_no)">
            <img :src="require('@/assets/product/' + book.book_img)" alt="cover">
          </div>

          <div>
            <ul class="prdt_list">
              <li class="prdt_item">
                <p> 도서명 : {{ book.book_name }}</p>
                <p> 저자 : {{ book.title }}</p>
                <p> 출간일 : {{ publDate(book.publ_date) }}</p>
                <p> 가격 : {{ formatPrice(book.book_price) }}</p>
              </li>
            </ul>
          </div>

          <div class="right">
            <button type="button" class="btn btn-dark" @click="goCart(book.prdt_no)">장바구니</button>
            <button type="button" class="btn btn-dark">찜</button>
          </div>
      </div>
      <div>
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
        return priceAry.reverse().join('') + '원'  //reverse 함수임
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
    }
  }
      }

</script>

<style scope>
h4{
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  padding : 20px 5px 5px 20px;
}
.col-sm-8{
  padding : 20px;
  text-align: center;
}
.col-sm-4{
  float : left;
  padding : 20px;
  text-align: center;
}
.prdt_item {
  display: block;
  margin-left : 0;
  float : left;
}

.selected{padding:10px; border-bottom:1px solid #ddd; box-sizing:border-box;}
.selected .left{float:left;}
.selected .right{float:right;}
.selected .right button{display:block; width:100px;}
.selected .right button:last-child{margin-top:5px;}
.selected:after{content:''; display:block; clear:both;}
</style>