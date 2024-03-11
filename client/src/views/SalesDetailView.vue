<template>
  <div class="container">
    <h1>주문관리 상세</h1>
    <ul>
      <li v-bind:key="idx" v-for="(sales, idx) in orderDetailList">
        <p><i>주문날짜</i> <span>{{ dataFormat(sales.orders_date) }}</span></p>
        <p><i>주문번호</i> <span>{{ sales.orders_no }}</span></p>
        <p><i>회원번호</i> <span>{{ sales.user_no }}</span></p>
        <p><i>도서명</i> <span>{{ sales.book_name }}</span></p>
        <p><i>금액</i> <span>{{ formatPrice(sales.total_pay_amount) }}원</span></p>
        <p><i>주문상태</i> <span>{{ orderState(sales.orders_state) }}</span></p>
      </li>
    </ul> 
  </div>
</template>

<style scoped>
  ul{margin-top:20px; list-style:none; padding-left:0;}
  li{border-top:1px solid #111; border-bottom:1px solid #ddd; margin-bottom:50px;}
  li p{margin:0; border-top:1px solid #ddd;}
  li p:first-child{border-top:0;}
  i{display:inline-block; font-style:normal; font-weight:700; width:120px; background:#f5f5f5; padding:10px;}
  span{display:inline-block; padding-left:20px;}
</style>

<script>
 import axios from 'axios'

  export default {
    data(){
      return {
        orderDetailList : {
          orders_date : '',
          orders_no : '',
          user_no : '',
          book_name : '',
          orders_state : '',
          total_pay_amount : '',
        }
      }
    },
    created(){
      let ono = this.$route.query.orderNo;
      this.getSalesDetail(ono);
    },
    methods : {
      async getSalesDetail(ono){ // 1. 단건조회 선행
        console.log('주문번호', ono);
        let result = await axios.get('/api/orderdetail/orderlist/' + ono) 
                              .catch(err => console.log(err));
        console.log(result);
        this.orderDetailList = result.data; // 2. 여기에 담음
        console.log('데이터데이터', this.orderDetailList);
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
