<template>
  <div class="books">
    <h3>오늘의 추천도서</h3>
    <div class="booklist">
    <ul>
      <li :key="i" v-for="(book, i) in bookList">
        <div>
          <span class="img" @click="goDetailBook(book.prdt_no)">
              <img :src="require('@/assets/product/' + book.book_img)" alt="cover">
          </span>
          <div class="text">
            <p class="category">{{ category(book.category_code) }}</p>
            <p class="tit">{{ book.book_name }}</p>
            <p class="author">{{ book.title }}</p>
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
.booklist li{float:left; width:17.6%; margin:0 1.5% 30px;}
.booklist li:nth-child(5n + 1){margin-left:0;}
.booklist li:nth-child(5n + 5){float:right; margin-right:0;}
.booklist ul:after{content:''; display:block; clear:both;}
.booklist li > div{width:100%;}
.booklist .img{display:block; position:relative; width:100%; height:330px; border:1px solid #ddd; cursor:pointer;}
.booklist .img:hover:before{content:''; display:block; position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0, 0, 0, 0.2);}
.booklist .img:hover:after{content:'+'; display:block; position:absolute; left:50%; top:50%; color:#fff; font-size:50px; transform:translate(-50%, -50%);}
.booklist img{display:block; width:100%; height:100%;}
.booklist .text{margin-top:10px; padding:5px; text-align:left; box-sizing:border-box;}
.booklist .text > *{margin-bottom:3px; letter-spacing:-1px; color:#555; font-size:15px;}
.booklist .text .tit{margin-bottom:3px; color:#333; font-size:16px; font-weight:700; height:50px; overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;}
.booklist .text .author{height:23px; overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1;}
.booklist .text .category{display:inline-block; padding:1px 10px; color:#777; font-size:14px; border:1px solid #ddd; border-radius:50px;}
</style>

