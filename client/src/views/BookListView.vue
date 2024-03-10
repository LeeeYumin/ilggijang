<template>
  <div class="container">
    <div class="row">
      <div class="booklist">
        <ul>
          <li :key="i" v-for="i in currentList">
            <span class="img"><img src="../assets/img_book_sample.jpg"></span>
            <div class="text">
              <p class="tit">{{ i.book_name }}</p>
              <p>{{ i.category_code }}</p>
              <p>{{ i.title }}</p>
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
      startCnt: 8,
      pages: 0,
      currentCode: null
    }
  },
  created() {
    // this.currentCode = this.code.slice(-1,-2);
    console.log(this.listId, this.code, this.currentCode);
    this.getBookList(this.currentPage);
  },
  methods: {
    async getBookList(pgno) {
      let result = await axios.get(`/api/bookLists${this.listId}${this.code}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
        console.log(result);
      this.currentList = result.data.list;
      if (this.listId != '/catlist') {
        this.pages = result.data.pages[0].pcnt;
      }
    },
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
