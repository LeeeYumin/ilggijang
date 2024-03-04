<template>
  <div class="books">
    <h3>도서 목록</h3>
    <div class="booklist" :key="i" v-for="(book, i) in bookList">
      <b-card :title="book.book_name" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
        tag="article" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          <p>{{ book.category_code }}</p>
          <p>{{ book.title }}</p>
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
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

      this.makeBookList(result.data);
    },
    makeBookList(json) {
      for (let i = 0; i < 8; i++) {
        this.bookList[i] = json[i];
      }
    }
  }
}
</script>

<style scoped>
.books {
  text-align: center;
  margin: 0 auto;
  width: 1526px;
}

.booklist {
  display: inline-block;
  margin: 20px;
}
</style>
