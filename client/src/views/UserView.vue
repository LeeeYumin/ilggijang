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
      loginSuccess : false
    }
  },
  methods: {
    
    async login() {
    try {
        const result = await axios.get('/api/user/login', {
           
                id: this.id,
                pw_no: this.pw_no
            
        });
        if (result.status === 200) {
       
            this.$router.push('/main');
        }
    } catch (err) {
        this.loginError = true;
        throw new Error(err)
    }
  }
  }
}
</script>
