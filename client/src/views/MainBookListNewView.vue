<template>
  <div class="books">
    <h3>신작도서</h3>
    <div class="booklist">
    <ul>
      <li :key="i" v-for="(book, i) in bookList">
        <div>
        <span class="img" @click="goDetailBook(book.prdt_no)"><img :src="require('@/assets/product/k472936042_1.jpg')"></span>
        <!-- prdt테이블 정리 후 '@/assets/product/' + book.book_img -->
          <div class="text">
            <p class="tit">{{ book.book_name }}</p>
            <p>{{ book.category_code }}</p>
            <p>{{ book.title }}</p>
          </div>
      </div>
    </li>
  </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      bookList: []
    }
  },
  created() {
    this.getBookList();
  },
  computed: {

  },
  methods: {
    async getBookList() {
      let result = await axios.get('/api/books')
        .catch(err => console.log(err));

      this.bookList = result.data;
    },
    goDetailBook(bno) {
      this.$router.push({ path : '/book', query : { 'bookNo' : bno }});
    }
  }
}
</script>

<style scoped>
.books {
  text-align: center;
  margin:auto 0;
}
h3{text-align:left; color:#333; font-size:25px; font-weight:700; letter-spacing:-1px;}
.booklist ul{padding:0 !important; list-style:none; margin-top:30px;}
.booklist li{float:left; width:18.4%; margin:0 1% 30px;}
.booklist li:nth-child(5n + 1){margin-left:0;}
.booklist li:nth-child(5n + 5){float:right; margin-right:0;}
.booklist ul:after{content:''; display:block; clear:both;}
.booklist li > div{width:100%;}
.booklist .img{display:block; position:relative; width:100%; height:350px; border:1px solid #ddd; cursor:pointer;}
.booklist .img:hover:before{content:''; display:block; position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0, 0, 0, 0.2);}
.booklist .img:hover:after{content:'+'; display:block; position:absolute; left:50%; top:50%; color:#fff; font-size:50px; transform:translate(-50%, -50%);}
.booklist img{display:block; width:100%; height:100%;}
.booklist .text{margin-top:10px; padding:5px; text-align:left; box-sizing:border-box;}
.booklist .text > *{margin-bottom:3px; letter-spacing:-1px; color:#777; font-size:15px;}
.booklist .text .tit{margin-bottom:3px; color:#333; font-size:16px; font-weight:700;}
</style>
