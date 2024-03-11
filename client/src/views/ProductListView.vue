<template>
  <div class="container">
    <h1>상품관리</h1>
     <router-link to="/admin/productInsert" class="btn btn-info">도서 추가</router-link>
      <table class="table table-hover">
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
      <tr v-for="(product, i) in product" v-bind:key="i" @click="goToDetail(product.prdt_no)">
    <td>{{ product.book_img }}</td>
    <td>{{ product.book_name }}</td>
    <td>{{ product.isbn }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.publ_co }}</td>
    <td>{{ formatPrice(product.book_price) }}</td>
      </tr>
     </tbody>
    </table>
    <div class = "page"  v-if="listId != '/catlist'">
    <b-pagination v-model="currentPage" pills :total-rows="pages" :per-Page="startCnt"
        @click="getproductList(currentPage)"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      product : [], // productList..?
      currentPage : 1,
      startCnt : 10,
      pages : 0,
      currentCode: null
    };
  },

  created() {
    this.getproductList();

    },

    methods : {
      async getproductList(){
        let result = await axios.get('/api/product')
                               .catch(err => console.log(err));
        console.log(result);
        this.product = result.data;
      },
      goToDetail(pno){
        this.$router.push({ path : '/admin/productDetail', query : {'prdtNo' : pno}});
      },
      formatPrice(book_price) {
      if (book_price > 999) {
        let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
        let idx = 0;
        while (priceAry.length > idx + 3) {
          priceAry.splice(idx + 3, 0, ',');
          idx += 4;
        }
        return priceAry.reverse().join('') + '원'
      } else {
        return book_price + '원'
      }
    }
}
}

</script>

<style>
.btn-info {
  float : right;
}
</style>