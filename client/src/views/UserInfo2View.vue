<template>
  <div class="container">
    <h1>회원 정보 조회</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td class="text-center">{{ userInfo2.user_no }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">아이디</th>
          <td class="text-center">{{ userInfo2.id }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">이름</th>
          <td class="text-center">{{ userInfo2.name }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">생년월일</th>
          <td class="text-center">{{ userInfo2.birth_date }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">성별</th>
          <td class="text-center">{{ Gender }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">주소</th>
          <td class="text-center">{{ userInfo2.addr }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">상세주소</th>
          <td class="text-center">{{ userInfo2.detail_addr }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">메일</th>
          <td class="text-center">{{ userInfo2.mail }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">연락처</th>
          <td class="text-center">{{ userInfo2.phone }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">로그인타입</th>
          <td class="text-center">{{ userInfo2.login_type_code }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">나이</th>
          <td class="text-center">{{ userInfo2.age_code }}</td>
        </tr>

      </table>

    </div>
    <div class="row">
      <button class="btn btn-info col-4" @click="goToUpdate(userInfo2.id)">수정</button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInfo2: {}
    }
  },
  computed: {
    // 성별: 남녀
    Gender() {
      let result = null;
      if (this.userInfo2.gender_code == 'm1') {
        result = '남'
      }
      else if (this.userInfo2.gender_code == 'm2') {
        result = '여'
      }
      return result;
    }


  },
  created() {
    let id = this.$store.state.id;
    console.log(id);
    this.getUserInfo(id);
  },
  methods: {
    async getUserInfo(id) {
      let result = await axios.get('/api/user/' + id)
        .catch(err => console.log(err));
      let info = result.data;
      this.userInfo2 = info;
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
    goToUpdate(id) {
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
      this.$router.push({ path: '/userUpdate', query: { 'id': id } });
    },
    // deleteInfo(id) {
    //   // 서버의 해당 데이터 삭제
    //   console.log(id);
    //   axios
    //     .delete('/api/admin/user/' + id)
    //     .then(result => {
    //       if (result.data.affectedRows != 0 && result.data.changedRows == 0) {
    //         alert(`정상적으로 삭제되었습니다.`);
    //         this.$router.push({ path: '/' });
    //       } else {
    //         alert(`삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
    //       }
    //     })
    //     .catch(err => console.log(err));
    //  }
  }
}






</script>