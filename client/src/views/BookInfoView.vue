<template>
  <div class="container text-center">

    <div class="row">

      <div class="col-6">
        <img src="{{ bookInfo.book_img }}">
        <p>카테고리 : {{ bookInfo.category_code }}</p>
      </div>
      <div class="col-6">
        <div class="book_info">
          <p>제목 : {{ bookInfo.book_name }} </p>
          <p>저자 : {{ bookInfo.title }} </p>
          <p>ISBN : {{ bookInfo.isbn }} </p>
        </div>
        <div class="book_info">
          <p>출판사 : {{ bookInfo.publ_co }}</p>
          <p>가격 : {{ formatPrice(bookInfo.book_price) }}</p>
          <p>출간일 : {{ publDate }}</p>
        </div>
        <div>
          <p>부가 설명 ex. 3시 이전 주문시 당일 출고</p>
        </div>
        <div class="btn">
          <button type="button" class="btn btn-dark">장바구니</button>
          <button type="button" class="btn btn-dark">찜</button>
          <button type="button" class="btn btn-dark">바로구매</button>
          <!--@click="" 추가할 것..?-->
        </div>
      </div>
    </div>

    <div class="detailDown">
      <div class="remains">
        <p>책 목차, 상세내용 영역 {{ bookInfo.detail_exp }}</p>
        <p>저자/관리자작성 책 소개 영역 {{ bookInfo.book_intro }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookInfo: {
        isbn: '',
        book_name: '',
        book_img: '',
        title: '',
        publ_co: '',
        book_price: '', //null 하면 여러건 나오는데 왜 그런거지??
        book_intro: '',
        detail_exp: '',
        publ_date: null,
        category_code: ''
      }
    }
  },
  computed : {
    publDate() {
            let result = null;
            if(this.bookInfo.publ_date != null){
                let date = new Date(this.bookInfo.publ_date);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                result = `${year}년 ${month}월 ${day}일`;
            }
            return result;
        }
  },
  created(){
    this.getBookInfo()
  },
  methods : {
    async getBookInfo(){
      let result = await axios.get('/api/books/BK000001')
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
    }
  }
}
</script>

<style>
.book_info {
  padding: 20px;
  line-height: 19px;
  font-weight: 400;
  text-align: left;
}

.btn {
  text-align: center;
  margin-right: 10px;
  padding: 10px;
}

.remains {
  background-color: antiquewhite;
  border-radius: 5px;
}
</style>