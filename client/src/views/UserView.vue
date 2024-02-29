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
    <button type="submit" class="w3-button w3-green w3-round">Login</button>
        </form> 
      </div>
    </div>
  </div>
  <Footer />
</template>



<script>
import Footer from '../layouts/FooterComponent.vue';

export default {
  components: {
  Footer
  },
  data() {
    return {
      id: '',
      pw_no: ''
    }
  },
  methods: {
    Login() {
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
