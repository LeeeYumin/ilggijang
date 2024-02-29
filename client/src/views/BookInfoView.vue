<template>
  <div class="container text-center">

    <div class="row">

      <div class="col-6">
        <img src="{{ bookInfo.img }}">
        <p>카테고리 : {{ bookInfo.category }}</p>
      </div>
      <div class="col-6">
        <div class="book_info">
          <p>제목 : {{ bookInfo.name }} </p>
          <p>저자 : {{ bookInfo.title }} </p>
          <p>ISBN : {{ bookInfo.isbn }} </p>
        </div>
        <div class="book_info">
          <p>출판사 : {{ bookInfo.publco }}</p>
          <p>가격 : {{ bookInfo.price }}</p>
          <p>출간일 : {{ bookInfo.publdate }}</p>
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
        <p>책 목차 영역 {{ bookInfo.intro }}</p>
        <p>저자/관리자 작성 책 소개 영역 {{ bookInfo.exp }}</p>
      </div>
    </div>

  </div>
</template>

<script>
//import axios from 'axios';

export default {
  data() {
    return {
      bookInfo: {
        isbn: '',
        name: '',
        img: '',
        title: '',
        publco: '',
        price: '',
        intro: '',
        exp: '',
        publdate: '',
        category: ''
      }
    }
  } //,
  // filters: { // 가격 3단위 구분...
  //   formatPrice(price) {
  //     if (price > 999) {
  //       var priceAry = price.split("").reverse();
  //       var idx = 1;
  //       while (priceAry.length > idx + 3) {
  //         priceAry.splice(idx + 3, 0, ',');
  //         idx += 4;
  //       }
  //       return priceAry.reverse.join('') + '원'
  //     } else {
  //       return price + '원'
  //     }
  //   }
  // }
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