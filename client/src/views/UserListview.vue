<template>
  <div class="container">
    <h1>회원조회</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-center table-primary">No.</th>
          <th class="text-center table-primary">아이디</th>
          <th class="text-center table-primary">이름</th>
          <th class="text-center table-primary">주소</th>
          <th class="text-center table-primary">메일</th>
          <th class="text-center table-primary">연락처</th>
          <th class="text-center table-primary">성별</th>
          <th class="text-center table-primary">가입일</th>
          <th class="text-center table-primary">회원등급</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, idx) in userList" v-bind:key="idx" v-on:click="goToUserInfo(user.id)">
          <td>{{ user.user_no }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.addr }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ gender(user.gender_code) }}</td>
          <td>{{ notiDate(user.join_date) }}</td>
          <td>{{ rank(user.user_rank_no) }}</td>
       




        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userList: []
    }
  },
  computed: {
    count() {
      return this.userList.length;
    }

  },
  watch: {
    // "userList가 바뀌면 뭘 하겠다"
    userList(newQuestion, oldQuestion) {
      console.log('이전 : ' + oldQuestion);
      // alert('데이터가 변경되었습니다.');
      console.log('이후 : ' + newQuestion);
    }
  },
  created() {
    // 비동기작업
    this.getUserList();
  },
  methods: {
    // 동기 작업
    // async : 내부 코드를 동기식으로 바꾸는 것
    //         함수 자체는 여전히 비동기식
    async getUserList() {
      // axios: == primise
      // axios 코드 : 반드시 순서대로 진행되야 함
      //             why: 데이터가 와야 진행됨
      // proxy 사용시 상대경로 사용(내 경로를 지정한 경로로 변경) => '/api'로 시작('^/api')
      let result = await axios.get('/api/user') // get 방식
        .catch(err => console.log(err));
      let list = result.data;
      this.userList = list; // 이 코드가 돌 시점에 userList에 제대로 값 넘어와야함 => await

      // 동기식으로 처리(await) : then X
      // 비동기 식으로 처리 : then O
    },
    goToUserInfo(id) {
      // 등록된 라우터에 대해 요청 메소드
      // 라우터는 무조건 get 방식(post X) => body 없음

      // path: 
      // query: 넘기는 부분 (key-value)
      //        여기서 정한 key를 받는 쪽에서도 알아야 함(받는 쪽: 새롭게 불려지는 컴포넌트)
      // $router.push: 통신을 요청 / $route : 통신을 받음

      this.$router.push({ path: '/admin/userInfo', query: { 'id': id } });
      //this.$router.push({ path: '/admin/userInfo', query: { 'id': id } });
      
      // this.$router.push({ name: 'userInfo', query: {'userId' : userId}});  // name으로도 가능
    },
    gender(gender) {
      let result = null;
      if (gender == 'm1') result = '남';
      else if (gender == 'm2') result = '여';
      else result = '';
      return result;

    },
    loginType(loginType){
      let result = null;
      if(loginType == 'j1') result = '사이트로그인';
      else if(loginType == 'j2') result = '네이버로그인';
        else result = '';
        return result;
      
    },
    //  ageType(ageType){
    //   let result = null;
    //   if(ageType =='z1') result = '10대';
    //   else if(ageType == 'z2') result = '20대';
    //   else if(ageType == 'z3') result = '30대';
    //   else if(ageType == 'z4') result = '40대';
    //   else if(ageType == 'z5') result = '50대';
    //   else if(ageType == 'z6') result = '60대';
    //   else result = '';
    //   return result;
    // },
    getToday() {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
         notiDate(orderDate) {
          let result = null;
          if(orderDate != null){
              let date = new Date(orderDate);
              let year = date.getFullYear();
              let month = ('0' + (date.getMonth() + 1)).slice(-2);
              let day = ('0' + date.getDate()).slice(-2);             
              
              result = `${year}-${month}-${day}`;
              return result;
          }
          return ''
      },
    rank(rank){
      let result = null;
      if(rank == '1') result = '일반회원';
      else if(rank == '2') result = '실버회원';
      else if(rank == '3') result = '골드회원';
      else if(rank == '4') result = '다이아회원';
      else result = '';
      return result;
    }
  }
}


</script>
