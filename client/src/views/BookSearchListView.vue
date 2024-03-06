<template>
  <div class="container">
    <h4> '{{ book_name }}' 에 대한 검색 결과</h4>
    <div class="row">
      <div class="result">
        <div class="selected" :key="i" v-for= "(book, i) in bookSearchList">
          <div class="left">책표지
            <img src="{{ book.book_img }}" alt="cover">
          </div>
          <div>
            <ul class="prdt_list">
              <li class="prdt_item">
                <p> 도서명 : {{ book.book_name }}</p>
                <p> 저자 : {{ book.title }}</p>
                <p> 출간일 : {{ book.publ_date }}</p>
                <p> 가격 : {{ formatPrice(book.book_price) }}</p>
              </li>
            </ul>
          </div>

          <div class="right">
            <button type="button" class="btn btn-dark">장바구니</button>
            <button type="button" class="btn btn-dark">찜</button>
          </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name : "bookSearch",

  data() {
    return {
      bookSearchList: [ ], //결과를 담는 배열
      book_name : history.state.text //검색어 수정 전 : this.$route.params.text
    }
  },
  mounted (){
    this.getBookSearchList()
  },
  // 검색결과 화면에서 다른 책 검색할 수 있게 watch 사용함
  watch: {
    book_name(newValue, oldValue) {
      if (newValue != oldValue){
        this.bookSearchList;
    }
  },
  methods : {
    async getBookSearchList(){
      let result = await axios.get('/api/books/search/'+ history.state.text)
                              .catch(err => console.log(err));
      console.log(result);
      this.bookSearchList = result.data;
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
    }
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