<!-- UserInsertView.vue -->
<template>
   <div class="container">
    <h3 class="text-center">회원 정보 등록</h3>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td class="text-center">
            <input class="form-control" type="number" v-model="userInfo.user_no" readonly>
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">ID</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="userInfo.id">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">비밀번호</th>
          <td class="text-center">
            <input class="form-control" type="password" v-model="userInfo.pw_no">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">이름</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="userInfo.name">
          </td>
        </tr>
         <tr>
          <th class="text-right table-primary">주소</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="userInfo.addr">
          </td>
        </tr>
         <tr>
          <th class="text-right table-primary">연락처</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="userInfo.phone">
          </td>
        </tr>
        
        
      </table>
    </div>
    <div class="row">
      <button class="btn btn-info" @click="insertInfo()">저장</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      // chkVal : '아니오',
      // 사용자 입력 전까지 공백 
      userInfo: {
        user_no : null,
        id : "",
        pw_no : "",
        name : "",
        addr : "",
        phone : ""
       
    
   
      }
    }
  },
  created() {

     let user_no = this.$route.query.user_no;
     this.getUserInfo(user_no);
   },
 
  methods : {
    insertInfo() {
      // 1) 유효성 체크
      if(!this.validation()) return;

      // 2) ajax
      // 2-1) 실제 보낼 데이터 선별
      let data = this.getSendData();

      // 2-2) axios 이용해 ajax
      axios
      .post('/api/user', data)
      .then(result => {
        // 3) 결과 처리
        let user_no = result.data.user_no;
        if(user_no == 0){
          alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`);
        }
        else {
          alert(`정상적으로 등록되었습니다.`);
          this.userInfo.user_no = user_no;
        }
      })
      .catch(err => console.log(err));


    },
    validation() {
      if(this.userInfo.id == '') {
        alert('아이디가 입력되지 않았습니다.');
        return false;
      }
      if(this.userInfo.pw_no== '') {
        alert('비밀번호가 입력되지 않았습니다.');
        return false;
      }
      if(this.userInfo.name == '') {
        alert('이름이 입력되지 않았습니다.');
        return false;
      }
      if(this.userInfo.addr == '') {
         alert('주소가 입력되지 않았습니다.');
         return false;
       }
      if(this.userInfo.phone == '') {
         alert('연락처가 입력되지 않았습니다.');
         return false;
       }
      
      return true;
    },
    getSendData() {
      let obj = this.userInfo;
      let delData = ["user_no"];
      let newObj = {};

      let isTargeted = null;
      for(let field in obj){
          isTargeted = false;
          for(let target of delData){
              if(field == target){
                isTargeted = true;
                break;
              }
          }
          if(!isTargeted){
            newObj[field] = obj[field];
          }
      }
      
    }
}

}
</script>