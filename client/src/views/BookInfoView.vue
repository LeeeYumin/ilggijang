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
          <p>가격 : {{ bookInfo.book_price }}</p>
          <p>출간일 : {{ bookInfo.publ_date }}</p>
        </div>
        <div>
          <p>부가 설명</p>
        </div>
        <div class="btn">
          <button type="button" class="btn btn-dark">장바구니</button>
          <button type="button" class="btn btn-dark">찜</button>
          <button type="button" class="btn btn-dark">바로구매</button>
          <!--@click="" 추가할 것-->
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
        book_price: '',
        book_intro: '',
        detail_exp: '',
        publ_date: '',
        category_code: ''
      }
    }
  },
  created(){
    this.getBookInfo(),
    this.getDate()
  },
  methods : {
    async getBookInfo(){
      let result = await axios.get('/api/books/BK000001')
                              .catch(err => console.log(err));
      console.log(result);
      this.bookInfo = result.data;
    }
  },
  getDate() {
    let dateValue = bookInfo.publ_date;
    let year = dateValue.getFullYear();
    let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
    let day = ('0' + dateValue.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  },
  filters: { // 가격 3단위 구분
    formatPrice(price) {
      if (price > 999) {
        var priceAry = price.split("").reverse();
        var idx = 1;
        while (priceAry.length > idx + 3) {
          priceAry.splice(idx + 3, 0, ',');
          idx += 4;
        }
        return priceAry.reverse.join('') + '원'
      } else {
        return price + '원'
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