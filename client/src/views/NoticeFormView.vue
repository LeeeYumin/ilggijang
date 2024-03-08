<!-- 수정 / 등록을 한 컴포넌트로 처리 -->

<template>
  <div class="container">
    <h3 class="text-center">{{ title }}</h3>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td class="text-center">
            <input class="form-control" type="number" v-model="noticeInfo.notice_no" readonly>
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">제목</th>
          <td class="text-center">

            <input class="form-control" type="text" v-model="noticeInfo.title" v-bind:readonly="isUpdated">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">내용</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="noticeInfo.content">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">등록날짜</th>
          <td class="text-center">
            <input class="form-control" type="date" v-model="noticeInfo.reg_date">
          </td>
        </tr>
        <tr>
          <!-- 남녀 -->
          <th class="text-right table-primary">조회수</th>
          <td class="text-center">

            <input type="number" v-model="noticeInfo.hit_cnt"> 여

          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">유형</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="noticeInfo.type">
          </td>
        </tr>
        <tr>
          <!-- 년월일 -->
          <th class="text-right table-primary">고정시작일</th>
          <td class="text-center">
            <input class="form-control" type="date" v-model="noticeInfo.fix_start_date"> <!-- yyyy-MM-dd -->
          </td>
        </tr>
        <tr>
          <!-- 년월일 -->
          <th class="text-right table-primary">고정마감일</th>
          <td class="text-center">
            <input class="form-control" type="date" v-model="noticeInfo.fix_end_date"> <!-- yyyy-MM-dd -->
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <!-- 첫번째 -->
      <!-- <button class="btn btn-info" @click="saveInfo(searchNo)">저장</button> -->
      <!-- 두번째 -->
      <button class="btn btn-info" @click="isUpdated ? updateInfo() : insertInfo()">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      noticeInfo: {
        notice_no: null,
        title: "",
        content: "",
        reg_date: "",
        hit_cnt: "",
        type: null,
        fix_start_date: null,
        fix_end_date: null
      },
      notice_no: null, // 등록 or 수정 판별
      isUpdated: false
    }
  },
  computed: {
    title() {
      return this.isUpdated ? '공지 수정' : '공지 등록';
    }
  },
  created() {
    this.notice_no = this.$route.query.notice_no;
    console.log(this.notice_no);
    // searchNo != null => 값 정보 변경 발생 => 사용자 요청 일어남
    if (this.notice_no != null && this.notice_no != undefined) {
      this.getNoticeInfo();
    } else {
      this.noticeInfo.reg_date = this.getDate('');
      this.noticeInfo.fix_start_date = this.getToday();
        this.noticeInfo.fix_end_date = this.getToday();
    }
  },
  methods: {
    async getNoticeInfo() {
      let result = await axios.get('/api/admin/notice/' + this.notice_no)
        .catch(err => console.log(err));
      console.log(result);
      let info = result.data;

      let newDate = this.getDate();
      info.join_date = newDate;

      this.noticeInfo = info;
      this.isUpdated = true;
    },
    saveInfo(notice_no) { // 첫번째
      // 1) 보낼 데이터 산출
      let info = this.getSendInfo(notice_no);

      // 2) ajax
      // axios(info) : post/put 한꺼번에 처리(메소드 제한 X)
      //               info => 엔드포인트까지 같이 반환해야 함
      // axios 기본: 객체로 모든 데이터 받음
      //             
      axios(info)
        .then(result => {
          let count = result.data.affectedRows;
          if (count == 0) {
            alert('저장되지 않았습니다. 내용을 확인해주세요');
          } else {
            alert('저장되었습니다.')

            if (result.data.notice_no > 0) { // 등록일 경우 추가 작업
              this.noticeInfo.notice_no = result.data.notice_no;
            }
          }
          console.log(result);
        })
        .catch(err => console.log(err));
    },
    getSendInfo(notice_no) {
      // method, url. data 정의 
      console.log(notice_no);
      let method = '';
      let url = '';
      let data = null;

      // id == null : 값 변경 안됨 => 등록
      // id != null : 값 변경됨 => 수정
      if (notice_no == null) {  // 등록
        method = 'post';
        url = '/api/admin/notice/';
        data = {
          "param": {
            notice_no: this.noticeInfo.notice_no,
            title: this.noticeInfo.title,
            content: this.noticeInfo.content,
            reg_date: this.noticeInfo.reg_date,
            hit_cnt: this.noticeInfo.hit_cnt,
            type: this.noticeInfo.type,
            fix_start_date: this.noticeInfo.fix_start_date,
            fix_end_date: this.noticeInfo.fix_end_date
          }
        }



      } else {  // 수정
        method = 'put';
        url = `/api/admin/notice/${notice_no}`;
        data = {
          "param": {
            notice_no: this.noticeInfo.notice_no,
            title: this.noticeInfo.title,
            content: this.noticeInfo.content,
            reg_date: this.noticeInfo.reg_date,
            hit_cnt: this.noticeInfo.hit_cnt,
            type: this.noticeInfo.type,
            fix_start_date: this.noticeInfo.fix_start_date,
            fix_end_date: this.noticeInfo.fix_end_date
          }
        };
      }

      return {
        // 필드명 == axios 객체 필드명
        method,
        url,
        data
      }
    },
    insertInfo() {
      if (!this.validation()) return;

      let data = {
        "param": {
          notice_no: this.noticeInfo.notice_no,
          title: this.noticeInfo.title,
          content: this.noticeInfo.content,
          reg_date: this.noticeInfo.reg_date,
          hit_cnt: this.noticeInfo.hit_cnt,
          type: this.noticeInfo.type,
          fix_start_date: this.noticeInfo.fix_start_date,
          fix_end_date: this.noticeInfo.fix_end_date
        }
      }

      axios
        .post('/api/admin/notice/', data)
        .then(result => {
          let notice_no = result.data.insertId;
          if (notice_no == 0) {
            alert(`등록되지 않았습니다.\n내용을 확인해주세요`)
          } else {
            alert(`정상적으로 등록되었습니다.`);
            this.noticeInfo.notice_no = notice_no;
          }
        })
        .catch(err => console.log(err));

    },
    updateInfo() {
      if (!this.validation()) return;

      let data = {
        "param": {
          notice_no: this.noticeInfo.notice_no,
          title: this.noticeInfo.title,
          content: this.noticeInfo.content,
          reg_date: this.noticeInfo.reg_date,
          hit_cnt: this.noticeInfo.hit_cnt,
          type: this.noticeInfo.type,
          fix_start_date: this.noticeInfo.fix_start_date,
          fix_end_date: this.noticeInfo.fix_end_date
        }
      };

      axios
        .put(`/api/admin/notice/${this.noticeInfo.notice_no}`, data)
        .then(result => {
          let count = result.data.changedRows;
          if (count == 0) {
            alert(`수정되지 않았습니다.\n내용를 확인해주세요`)
          } else {
            alert(`정상적으로 수정되었습니다.`);
            this.$router.push({ path: '/noticeInfo', query: { 'noticeNo': this.noticeInfo.notice_no } });
          }
        })
        .catch(err => console.log(err));

    },
    validation() {
      if (this.noticeInfo.title == "" && !this.isUpdated) {
        alert('제목이 입력되지 않았습니다.');
        return false;
      }

      if (this.noticeInfo.content == "" && !this.isUpdated) {
        alert('내용이 입력되지 않았습니다.');
        return false;
      }

      if (this.noticeInfo.user_type == "") {
        alert('유형이 입력되지 않았습니다.');
        return false;
      }

      return true;
    },
    getSendData() {
      let obj = this.noticeInfo;
      let delData = ["notice_no"];
      let newObj = {};

      let isTargeted = null;
      for (let field in obj) {
        isTargeted = false;
        for (let target of delData) {
          if (field == target) {
            isTargeted = true;
            break;
          }
        }
        if (!isTargeted) {
          newObj[field] = obj[field];
        }
      }
      let newData = {
        "param": newObj
      }
      return newData;
    },
    getDate(value) {
      if (value == null) return null;
      let date = value == '' ? new Date() : new Date(value);
      let year = date.getFullYear();
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  }
}
</script>