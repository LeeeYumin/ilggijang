<template>
  <div class="container">
    <div class="row">
      <div class="booklist">
        <ul>
          <li :key="i" v-for="i in currentList">
            <span class="img" @click="goDetailBook(i.prdt_no)">
              <img :src="getImgUrl(i.book_img)" alt="cover">
            </span>
            <div class="text">
              <p class="category">{{ category(i.category_code) }}</p>
              <p class="tit">{{ i.book_name }}</p>
              <p class="author">{{ i.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="page" v-if="listId != '/catlist'">
      <b-pagination v-model="currentPage" :total-rows="pages" :per-Page="startCnt"
        @click="getBookList(currentPage)">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    code: { type: String, default: '' },
    listId: { type: String, default: '' }
  },
  data() { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
    return {
      currentList: [],
      currentPage: 1,
      // listId: '/recdlist',
      startCnt: 10,
      pages: 0,
      // currentCode: null
    }
  },
  created() {
    // this.currentCode = this.code.slice(-1,-2);
    console.log(this.listId, this.code);
    this.getBookList(this.currentPage);
  },
  methods: {
    async getBookList(pgno) {
      let makepno = this.listId == '/catlist' ? `` : `/`+((pgno - 1) * this.startCnt);
      let result = await axios.get(`/api/bookLists${this.listId}${this.code}${makepno}`)
        .catch(err => console.log(err));
        console.log(result);
      this.currentList = result.data.list;
      if (this.listId != '/catlist') {
        this.pages = result.data.pages[0].pcnt;
      }
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
    },
    getImgUrl(imgName) { // 이미지 동적으로 가져오기
        return new URL(`/product/${imgName}`, 'http://localhost:8081');
      }
  }
}
</script>

<style scoped>

.container{padding-top:20px !important; margin-bottom:50px;}
.justify-content-start{justify-content:center !important;}
.row{display:flex; gap:2%; flex-wrap:wrap; justify-content:space-between; margin-bottom:20px;}
.booklist ul{list-style:none; padding-left:0;}
.booklist ul li{float:left;}
.booklist ul:after{content:''; display:block; clear:both;}
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
