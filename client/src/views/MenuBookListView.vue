<template>
  <div class="container">
    <h3>도서 목록</h3>
    <div class="row">
      <div class="col-3 booklist" :key="i" v-for="i in currentList">
        <b-card :title="i.book_name" img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
          <b-card-text>
            <p>{{ i.category_code }}</p>
            <p>{{ i.title }}</p>
          </b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
      </div>
    <div>
      <b-pagination v-model="currentPage" pills :total-rows="bookList.length" :per-Page="perPage" @click="makeBookList(bookList, currentPage)"></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookList: [],
      currentList: [],
      currentPage: 1,
      perPage: 8
    }
  },
  async created() {
    await this.getBookList();
    this.makeBookList(this.bookList, this.currentPage);
  },
  computed: {
    
    
  },
  methods: {
    async getBookList() {
      let result = await axios.get('/api/bookLists/2')
        .catch(err => console.log(err));

      this.bookList = result.data;
    },
    makeBookList(json, pgno){
      for (let i = (pgno-1)*this.perPage; i<(pgno*this.perPage); i++){
        this.currentList[i] = json[i];
      }
    }
  }
}
</script>

<style scoped>
.booklist {
  padding: 20px;
}
</style>
