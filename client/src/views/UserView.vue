<template>
 
  <div class="container text-center">
    <div>
      <h2>로그인</h2>
      <div id="loginForm"> 
        <form @submit.prevent="Login"> 
          <div class="mb-3">
    <input class="w3-input" name="uid" placeholder="ID를 입력해주세요" v-model="id"><br>
  </div>
  <div class="mb-3">
    <input name="pw" class="w3-input" placeholder="PW를 입력해주세요" v-model="pw_no" type="password">
  </div>
    <button v-on:click="login" type="submit" class="w3-button w3-green w3-round">Login</button>
    
        </form> 
      </div>
    </div>
  </div>
  <Footer />
</template>



<script>
import axios from 'axios';

import Footer from '../layouts/FooterComponent.vue';

export default {
  components: {
  Footer
  },
  data() {
    return {
      id: '',
      pw_no: '',
    
    }
  },
  methods: {
    
    async Login() {
      this.validation();

      // 회원 단건조회
      let result = await axios.get('/api/user/' + this.id)
                              .catch(err => console.log(err));
      console.log(result);

      let uid = result.data.id;
      let upw = result.data.pw_no;

      //console.log(uid, upw);

      if(uid == this.id && upw == this.pw_no) {
        alert('로그인 되었습니다.');
        this.$router.push({path : '/main'});
      }
    },
    validation() {
      if (this.id === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.pw_no === '') {
        alert('비밀번호를 입력하세요.')
        return
      }
    }
  }
}
</script>
