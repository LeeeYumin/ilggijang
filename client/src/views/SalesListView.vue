<template>
  <div class="container">
    <h1>주문관리</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>주문날짜</th>
          <th>주문번호</th>
          <th>회원번호</th>
          <th>도서명</th>
          <th>수량</th>
          <th>금액</th>
          <th>주문상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="idx" v-for="(sales, idx) in salesList" @click="goToDetail(sales.orders_no)">
          <td>{{ dataFormat(sales.orders_date) }}</td>
          <td>{{ sales.orders_no }}</td>
          <td>{{ sales.user_no }}</td>
          <td>{{ sales.book_name }}</td>
          <td>{{ sales.count }}</td>
          <td>{{ formatPrice(sales.order_price) }}</td>
          <td>{{ orderState(sales.orders_state) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      salesList : []
    };
  },
  created() {
    this.getOrderList();
    },

    methods : {
      async getOrderList(){
        let result = await axios.get('/api/orders/sales')
                                .catch(err => console.log(err));
        console.log(result);
        this.salesList = result.data;
        console.log('데이터 받아오세요', this.salesList);
      },
      goToDetail(ono){
        this.$router.push({ path : '/admin/salesDetail', query : {'orderNo' : ono}});
      },
      dataFormat(value) {
        let result = null;
        if (value != null) {
          let date = new Date(value);
          let year = date.getFullYear();
          let month = ("0" + (date.getMonth() + 1)).slice(-2);
          let day = ("0" + date.getDate()).slice(-2);

          result = `${year}-${month}-${day}`;
        }
        return result;
      },
      formatPrice(book_price) {
          if (book_price > 999) {
              let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
              let idx = 0;
              while (priceAry.length > idx + 3) {
              priceAry.splice(idx + 3, 0, ',');
              idx += 4;
              }
              return priceAry.reverse().join('') //reverse 함수임
          } else {
              return book_price
          }
      }, 
      orderState(state) {
          let result = '';
          switch(state) {
              case 's1': 
              result = '결제완료';
              break;
              case 's2':
              result = '배송준비중';
              break;
              case 's3':
              result = '배송중';
              break;
              case 's4':
              result = '배송완료';
              break;
              case 's5':
              result = '구매취소';
              break;
              case 's6':
              result = '구매취소완료';
              break;
          }
          return result;
      }
    }
}

</script>

<style scope>
  table{text-align:center;}
</style>