<template>
  <div class="container">
    <h1>공지사항 조회</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td>{{ noticeInfo.notice_no }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">제목</th>
          <td>{{ noticeInfo.title }}</td>
        </tr>
           <tr>
          <th class="text-right table-primary" type="text">내용</th>
          <td>{{ noticeInfo.content }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">등록날짜</th>
          <td>{{ notiDate(noticeInfo.reg_date)   }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">조회수</th>
          <td >{{ noticeInfo.hit_cnt }}</td>
        </tr>

      </table>

    </div>
    <div class="row">
         
      <router-link to="/userNotice" class="btn btn-success col-4">목록</router-link>     
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      noticeInfo: {}
    }
  },
  created() {
    let notice_no = this.$route.query.noticeNo;
    console.log(notice_no);
    this.getuserNoticeInfo(notice_no)
  },
  methods: {
    async getuserNoticeInfo(notice_no) {
      let result = await axios.get('/api/notice/' + notice_no)
        .catch(err => console.log(err));
      let info = result.data;
      this.noticeInfo = info;
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
  }
   
}
}
</script>