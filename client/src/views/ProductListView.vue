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
      <tr :key="i" v-for="(product, i) in productList" @click="goToDetail(product.no)">
    <td>{{ product.book_img }}</td>
    <td>{{ product.book_name }}</td>
    <td>{{ product.isbn }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.publ_co }}</td>
    <td>{{ product.book_price }}</td>
      </tr>
     </tbody>
    </table>
  </div>
</template>

<script>
// import axios from 'axios'

// export default {
//   data(){
//     return {
//       productList : []
//     };
//   },

//   created() {
//     this.productList();

//     },

//     methods : {
//       async productList(){
//         let result = await axios.get('/api/product')
//                                .catch(err => console.log(err));

//         this.productList = result.data;
//     }
//   }
// }


</script>

<style>

</style>