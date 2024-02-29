<template>
  <div class="books">
    <div class="booklist" :key="j" v-for="(book, j) in bookList">
      <b-card :title="book.book_name" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
        tag="article" style="max-width: 20rem;" class="mb-2" v-if="j <= 7">
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
  methods: {
    async getBookList() {
      let result = await axios.get('/api/books')
        .catch(err => console.log(err));

      this.bookList = result.data;
    }
  }
}
</script>

<style scoped>
.books {
  margin: 0 auto;
}
.booklist {
  display: inline-block;
}

</style>
