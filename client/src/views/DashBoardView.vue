<template>

  <div class="row">
    <div class="col-6" id="chart">
      <h5>월별판매량</h5>
      <img class="d-block" src="../assets/chart_example.png" />

      <!-- <Chart
        :size="{ width: 500, height: 200 }"
        :data="plByMonth"
        :margin="margin"
        :direction="direction">

        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Line :dataKeys="['name', 'pl']" />
        </template>

      </Chart> -->

    </div>

    <div class="col-6">
      <h5>주문내역</h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">주문날짜</th>
            <th scope="col" class="text-center table-primary">주문번호</th>
            <th scope="col" class="text-center table-primary">회원번호</th>
            <th scope="col" class="text-center table-primary">수량</th>
            <th scope="col" class="text-center table-primary">금액</th>
            <th scope="col" class="text-center table-primary">주문상태</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-bind:key="idx" v-for="(sales, idx) in salesList" @click="goToDetail(sales.orders_no)">
            <template v-if="idx < 5">
              <td>{{ dataFormat(sales.orders_date) }}</td>
              <td>{{ sales.orders_no }}</td>
              <td>{{ sales.user_no }}</td>
              <td>{{ sales.count }}</td>
              <td>{{ formatPrice(sales.order_price) }}</td>
              <td>{{ orderState(sales.orders_state) }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="row">
    <div class="col-6">
      <h5>공지사항</h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">No</th>
            <th scope="col" class="text-center table-primary">제목</th>
            <th scope="col" class="text-center table-primary">등록일</th>
            <th scope="col" class="text-center table-primary">공지타입</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice, idx) in noticeList" :key="idx"
              v-on:click="goToNoticeInfo(notice.notice_no)">
            <template v-if="idx < 5">
              <td>{{ notice.notice_no }}</td>
              <td>{{ notice.title }}</td>
              <td>{{ notiDate(notice.reg_date) }}</td>
              <td>{{ noticeType(notice.type) }}</td>
            </template>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="col-6">
      <h5>상품 QnA</h5>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">No</th>
            <th scope="col" class="text-center table-primary">제목</th>
            <th scope="col" class="text-center table-primary">등록일</th>
            <th scope="col" class="text-center table-primary">공지타입</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice, idx) in noticeList" :key="idx">
            <template v-if="idx < 5">
              <td>{{ notice.notice_no }}</td>
              <td>{{ notice.title }}</td>
              <td>{{ notiDate(notice.reg_date) }}</td>
              <td>{{ noticeType(notice.type) }}</td>
            </template>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// import { defineComponent, ref } from 'vue'
// import { Chart, Grid, Line } from 'vue3-charts'

// export default defineComponent({
//   name: 'LineChart',
//   components: { Chart, Grid, Line },
//   setup() {
//     const plByMonth = [
//       { name: '1월', pl: 1000, avg: 500, inc: 300 },
//       { name: '2월', pl: 2000, avg: 900, inc: 400 },
//       { name: '3월', pl: 400, avg: 400, inc: 500 },
//       { name: '4월', pl: 3100, avg: 1300, inc: 700 },
//       { name: '5월', pl: 200, avg: 100, inc: 200 },
//       { name: '6월', pl: 600, avg: 400, inc: 300 },
//       { name: '7월', pl: 500, avg: 90, inc: 100 }
//     ]
//     const direction = ref('horizontal')
//     const margin = ref({
//       left: 0,
//       top: 20,
//       right: 20,
//       bottom: 20
//     })

//     return { plByMonth, direction, margin }
//   }
// })


export default {
  data() {
    return {
      noticeList : []
    }
  },
  created() {
    this.getOrderList();
    this.getNoticeList();
  },
  methods:{
    // 공지관리
    noticeType(noticeType){
      let reault = null;
      if(noticeType == 'n1') reault = '이벤트';
      else if(noticeType == 'n2') reault = '정책변경';
      else if(noticeType == 'n3') reault = '공지';
      else reault = '';
      return reault;
    },

    notiDate(orderDate) {
      let result = null;
      if (orderDate != null) {
        let date = new Date(orderDate);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        result = `${year}-${month}-${day}`;
        return result;
      }
      return "";
    },
    async getNoticeList() {
      let result = await axios.get("/api/notice");
      console.log(result)
      this.noticeList = result.data;
    },
    goToNoticeInfo(nno) {
      this.$router.push({ path: "/admin/noticeInfo", query: { notice_no: nno }});
    },
    // 주문관리
    async getOrderList(){
      let result = await axios.get('/api/orders/sales')
                              .catch(err => console.log(err));
      console.log(result);
      this.salesList = result.data;
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
              case '' :
              result = '배송완료'
        }
        return result;
    }
  }
}
</script>

<style>
  #chart {
    color: #000000;
  }
</style>