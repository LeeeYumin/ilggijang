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
          <td>{{ notiDate(noticeInfo.reg_date) }}</td>
        </tr>
        {{
          noticeInfo.content
        }}
        <tr>
          <th class="text-right table-primary">조회수</th>
          <td>{{ noticeInfo.hit_cnt }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">유형</th>
          <td>{{ noticeType(noticeInfo.type) }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">고정시작일</th>
          <td>{{ notiDate(noticeInfo.fix_start_date) }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">고정마감일</th>
          <td>{{ notiDate(noticeInfo.fix_end_date) }}</td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-info" @click="goToUpdate(noticeInfo.notice_no)">
        수정
      </button>
      <router-link to="/admin/notice" class="btn btn-info">목록</router-link>
      <button class="btn btn-info" @click="deleteInfo(noticeInfo.notice_no)">
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      noticeInfo: {},
    };
  },
  created() {
    let notice_no = this.$route.query.notice_no;
    console.log(notice_no);
    this.getNoticeInfo(notice_no);
  },

  methods: {
    async getNoticeInfo(notice_no) {
      let result = await axios
        .get("/api/notice/" + notice_no)
        .catch((err) => console.log(err));
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
    },
    noticeType(noticeType) {
      let reault = null;
      if (noticeType == "n1") reault = "이벤트";
      else if (noticeType == "n2") reault = "정책변경";
      else if (noticeType == "n3") reault = "공지";
      else reault = "";
      return reault;
    },

    goToUpdate(notice_no) {
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});
      this.$router.push({
        path: "/admin/noticeUpdate",
        query: { notice_no: notice_no },
      });
    },
    async deleteInfo(notice_no) {
      // 서버에 해당 데이터를 삭제
      await axios
        .delete("/api/notice/" + notice_no) //http://localhost:3000/notice/14
        .then((result) => {
          if (result.data.affectedRows != 0 && result.data.changedRows == 0) {
            alert(
              `삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`
            );
          } else {
            alert(`정상적으로 삭제되었습니다.`);
            this.$router.push({ path: "/admin/notice" });
          }
        })

        .catch((err) => console.log(err));
    },
  },
};
</script>