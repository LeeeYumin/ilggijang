<template>
  <div class="container">
    <h3>추천도서</h3>
    <div class="">
      <b-tabs content-class="mt-3">
        <b-tab title="10대" @click="getBookList(currentPage, codes[0])" active></b-tab>
        <b-tab title="20대" @click="getBookList(currentPage, codes[1])"></b-tab>
        <b-tab title="30대" @click="getBookList(currentPage, codes[2])"></b-tab>
        <b-tab title="40대" @click="getBookList(currentPage, codes[3])"></b-tab>
        <b-tab title="50대" @click="getBookList(currentPage, codes[4])"></b-tab>
        <b-tab title="60대이상" @click="getBookList(currentPage, codes[5])"></b-tab>
      </b-tabs>
        <div class="row">
          <div class="col-3 booklist" :key="i" v-for="i in currentList">
            <b-card :title="i.book_name" :img-src="i.book_img" img-alt="Image" img-top
            tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                  <p>{{ i.category_code }}</p>
                  <p>{{ i.title }}</p>
                </b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
          </div>
        </div>
        <div>
          <b-pagination v-model="currentPage" pills :total-rows="pages" :per-Page="startCnt"
          @click="getBookList(currentPage, currentCode), makePage(currentCode)"></b-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
  data() {
    return {
      currentList: [],
      currentPage: 1,
      listId: 'recdlist',
      startCnt: 8,
      pages: 0,
      currentCode: 'z2',
      codes: ['z1','z2','z3','z4','z5','z6']
    }
  },
  created() {
    this.makePage(this.currentCode);
    this.getBookList(this.currentPage, this.currentCode);
  },
  computed:{
    
  },
  methods: {
    async getBookList(pgno, c) {
      this.currentCode = c;
      let result = await axios.get(`/api/bookLists/${this.listId}/${this.currentCode}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async makePage(c) {
      let result = await axios.get(`/api/bookLists/${this.listId}/${c}`)
        .catch(err => console.log(err));
      this.pages = result.data[0].pcnt;
    },
    // changeCode(code){
    //   console.log(code);
    //   this.currentCode = code;
    // },
  }
}
</script>

<style scoped>
.booklist {
  padding: 20px;
}
</style>
