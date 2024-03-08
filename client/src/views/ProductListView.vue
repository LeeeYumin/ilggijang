<template>
  <div class="container">
    <h1>상품관리</h1>
      <table class="table">
        <thead>
          <tr>
            <th>도서이미지</th>
            <th>도서명</th>
            <th>도서번호</th>
            <th>저자</th>
            <th>출판사</th>
            <th>가격</th>
          </tr>
        </thead>

    <tbody>
      <tr v-for="(product, i) in product" v-bind:key="i" @click="goToDetail(product.book_img)">
    <td>{{ product.book_img }}</td>
    <td>{{ product.book_name }}</td>
    <td>{{ product.isbn }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.publ_co }}</td>
    <td>{{ product.book_price }}</td>
      </tr>
     </tbody>
    </table>
    <router-link to="/admin/productInsert" class="btn btn-info col-4">도서 추가</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      product : [] // productList ?
    };
  },

  created() {
    this.getproduct();

    },

    methods : {
      async getproduct(){
        let result = await axios.get('/api/product')
                               .catch(err => console.log(err));

        this.productList = result.data;
    }
  }
}


</script>

<style>

</style>