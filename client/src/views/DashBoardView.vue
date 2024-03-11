<template>

  <h1>관리자 페이지</h1>
  <div class="row">
    <div class="col-6" id="chart">
      <h5>월별판매량</h5>
      <!-- <img :src="@/assets/chart_example/png">  -->

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
      <h5>주문현황</h5>
      <table class="table ">
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

  <div class="row">
    <div class="col-6">
      <h5>공지사항</h5>
      <table class="table ">
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

    <div class="col-6">
      <h5>상품 QnA</h5>
      <table class="table ">
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
    this.getNoticeList ()
  },
  methods:{
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
    }
  }
}
</script>

<style>
  #chart {
    color: #000000;
  }
</style>