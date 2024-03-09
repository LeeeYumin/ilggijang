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
    <button v-on:click="Login" type="submit" class="w3-button w3-green w3-round">Login</button>
    <button v-on:click="join"  class="w3-button w3-green w3-round" >회원가입</button>
    <button v-on:click="findid"  class="w3-button w3-green w3-round" >아이디찾기</button>
    <button v-on:click="findpw"  class="w3-button w3-green w3-round" >비밀번호찾기</button>
    <NaverLogin />
    

        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>




<script>
import axios from 'axios';
import Footer from '../layouts/FooterComponent.vue';
import NaverLogin from '../components/NaverLogin.vue';

export default {
  components: {
  Footer
  ,NaverLogin
  },
  data() {
    return {
      id: '',
      pw_no: ''
      
      
      
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
      let userNo = result.data.user_no;
      let loginTypeCode = result.data.loginTypeCode;
      
    

      //console.log(uid, upw);

      if(uid == this.id && upw == this.pw_no) {
        this.$store.commit('setIsLogin', true);
        this.$store.commit('setId', uid);
        this.$store.commit('setUserNo', userNo);
        this.$store.commit('setLoginTypeCode', loginTypeCode);
        
        
        alert('로그인 되었습니다.');

        console.log(this.$store.state.isLogin);
        console.log(this.$store.state.id);
        console.log(this.$store.state.userNo);
       
       

        if(this.id=='admin'){
          this.$router.push({path : '/admin'});
        }else{
          this.$router.push({path : '/main'});
        }
      }else{
        alert('아이디 또는 비밀번호를 다시 입력해주세요.');
       
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
    },
     join(){
      this.$router.push({path : '/userjoin'});
    }
    ,
    naverLogin(){
      this.$router.push({path : '/NaverLogin'});
    },
    
    logout() {
      axios.get().then((res) => {   
        localStorage.removeItem('vuex');
        
        this.$router.push({path : '/main'});
        console.log(res.data);
      });
 
      
    }
  },

  
}


  

  
</script>
