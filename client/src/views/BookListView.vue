<template>
  <div class="container">
    <div class="row">
      <div class="col-3 booklist" :key="i" v-for="i in currentList">
        <b-card :title="i.book_name" :img-src="i.book_img" img-alt="Image" img-top tag="article"
          style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            <p>{{ i.category_code }}</p>
            <p>{{ i.title }}</p>
          </b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
    </div>
    <div v-if="listId != '/catlist'">
      <b-pagination v-model="currentPage" pills :total-rows="pages" :per-Page="startCnt"
        @click="getBookList(currentPage)"></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    code: { type: String, default: ''},
    listId: { type: String, default: ''}
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
    if (this.listId != '/catlist') {
      this.makePage();
    }
    this.getBookList(this.currentPage);

  },
  methods: {
    async getBookList(pgno) {
      let result = await axios.get(`/api/bookLists${this.listId}${this.code}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async makePage() {
      let result = await axios.get(`/api/bookLists${this.listId}${this.code}`)
        .catch(err => console.log(err));
      this.pages = result.data[0].pcnt;
    },
  }
}
</script>

<style scoped>
.booklist {
  padding: 20px;
}
</style>
