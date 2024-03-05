<template>
    <div class="container">
        <h1>회원 정보 조회</h1>
        <div class="row">
      <table class="table">
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.user_no }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.id }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.name }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.birth_date }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.addr }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.detail_addr }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.mail }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.phone }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.login_type_code }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ userInfo.age_code }}</td>
        </tr>

      </table>

        </div>
        <div class="row">
      <button class="btn btn-info col-4" @click="goToUpdate(userInfo.id)">수정</button>
      <router-link to="/" class="btn btn-success col-4">목록</router-link>
      <button class="btn btn-warning col-4" @click="deleteInfo(userInfo.id)">삭제</button>
    </div>
    </div>

</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            userInfo : {}
        }
    },
    computed: {
    // 성별: 남녀
    Gender() {
      let result = null;
      if(this.userInfo.gender == 'M'){
        result = '남성'
      }
      else if(this.userInfo.gender == 'F'){
        result =  '여성'
      }
      return result
    },
  methods : {
    async getUserInfo(Id) {
      let result = await axios.get('/api/user/' + Id)
                              .catch(err => console.log(err));
      let info = result.data;
      this.userInfo = info; 
    },
    goToUpdate(Id) {
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
      this.$router.push({ path: '/userForm', query: {'Id' : Id}});
    },
    deleteInfo(Id) {
      // 서버의 해당 데이터 삭제
      console.log(Id);
      axios
      .delete(`/api/user/${Id}`)
      .then(result => {
          if(result.data.affectedRows != 0 && result.data.changedRows == 0){
              alert(`정상적으로 삭제되었습니다.`);
               this.$router.push({path : '/'});
          }else{
              alert(`삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
          }
      })
      .catch(err => console.log(err));
    }
  }
}
}





</script>