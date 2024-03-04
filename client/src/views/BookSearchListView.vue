<template>
  <div class="container">
    <h4> '{{  }}' 에 대한 검색 결과</h4>
    <div class="row">
      <div class="result">
          <div class="selected">
            <div class="left">상품설명
              <p>책 이미지 {{ bookSearchList.book_img }} </p>
              <ul class="prdt_list">
                <li class="prdt_item">
                  <p>{{ bookSearchList.book_name }}</p>
                  <p>{{ bookSearchList.title }}</p>
                  <p>{{ bookSearchList.publ_date }}</p>
                  <p>{{ bookSearchList.book_price }}</p>
                </li>
              </ul>
            </div>

            <div class="right">
              <button type="button" class="btn btn-dark">장바구니</button>
              <button type="button" class="btn btn-dark">찜</button>
            </div>
        </div>
          <div class="selected">
            <div class="left">상품설명
              <p>책 이미지  {{ bookSearchList.book_img }} </p>
              <ul class="prdt_list">
                <li class="prdt_item">
                  <p>{{ bookSearchList.book_name }}</p>
                  <p>{{ bookSearchList.title }}</p>
                  <p>{{ bookSearchList.publ_date }}</p>
                  <p>{{ bookSearchList.book_price }}</p>
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
//import axios from 'axios';

export default {
  data() {
    return {
      bookSearchList: {
      book_img : '',
      book_name : '',
      title : '',
      publ_date : null,
      book_price : ''
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
  margin: 0;
  float : left;
}

.selected{padding:10px; border-bottom:1px solid #ddd; box-sizing:border-box;}
.selected .left{float:left;}
.selected .right{float:right;}
.selected .right button{display:block; width:100px;}
.selected .right button:last-child{margin-top:5px;}
.selected:after{content:''; display:block; clear:both;}
</style>