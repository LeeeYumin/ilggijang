<template>
  <div class="container">
    <h3>공지사항 조회</h3>
      <table class="table">
        <colgroup>
          <col span="1" width="15%;">
          <col span="1" width="85%;">
        </colgroup>
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
          <td>{{ noticeInfo.reg_date }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">조회수</th>
          <td>{{ noticeInfo.hit_cnt }}</td>
        </tr>

      </table>

      <div class="btn_box">
        <router-link to="/userNotice" class="btn btn-outline-primary">목록</router-link>     
      </div>
  </div>

</template>

<style scoped>
  .container{padding-top:50px; margin-bottom:50px;}
  h3{font-weight:700;}
  .table{margin-top:20px; border-top:1px solid #111; text-align:left;}
  .table tr{border-bottom:1px solid #ddd;}
  .table tr th{padding-left:20px; background:#fbfbfb;}
  .table tr td{padding:10px; padding-left:20px;}
  .btn_box{margin-top:20px; text-align:center;}
  .btn_box a{padding:10px 30px;}
</style>

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
    dataFormat(value) {
      let result = null;
      if (value != null) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        result = `${year}-${month}-${day}`
      }
      return result;
    }
   
}
}
</script>