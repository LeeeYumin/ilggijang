<template>
  <div class="login_con">
    <div class="login">
      <div class="logo">
        <router-link to="main">
            <img src="@/assets/ilggijang_logo.png" style="width: 100px;">
        </router-link>
      </div>
      <div id="loginForm">
        <ul>
          <li>
            <input class="w3-input" name="uid" placeholder="ID를 입력해주세요" v-model="id"><br>
          </li>
          <li>
            <input name="pw" class="w3-input" placeholder="PW를 입력해주세요" v-model="pw_no" type="password">
          </li>
        </ul>
        <button v-on:click="Login" type="submit" class="btn_login">로그인</button>
        <div class="btn_box">
          <ul>
            <li><button v-on:click="join">회원가입</button></li>

            <li><router-link to="/searchId">아이디 찾기</router-link></li>
            <li><button v-on:click="findpw">비밀번호찾기</button></li>
          </ul>
        </div>
        <NaverLogin />
      </div>
    </div>
  </div>
  <Footer class="footer" />
</template>

<style scoped>
  .login_con{display:flex; justify-content:center; align-items:center; text-align:center;}
  .login_con .login{width:500px; height:520px; margin-top:7%; padding:20px 50px; background:#f5f5f5; border-radius:20px; box-sizing:border-box; box-shadow:0 0 5px 1px rgba(0, 0, 0, 0.1);}
  .login_con .login ul{list-style:none; padding-left:0;}
  .login_con .login ul li{margin-bottom:10px;}
  .login_con .login ul li input{width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;}
  .logo{margin:25px 0 20px;}
  .btn_login{width:100%; margin-top:10px; padding:15px; color:#fff; font-size:18px; font-weight:700; border:0; background:#767676; border-radius:8px;}
  .footer{position:absolute; bottom:0; width:100%;}
  .btn_box{margin-top:20px;}
  .btn_box li{display:inline-block; position:relative; margin:0 5px;}
  .btn_box li:before{content:''; display:block; position:absolute; left:-5px; top:5px; width:1px; height:15px; border-left:1px solid #aaa;}
  .btn_box li:first-child:before{display:none;}
  .btn_box a,
  .btn_box button{margin:0; border:0; background:none; color:#555; font-size:15px; letter-spacing:-0.5px;}
  .btn_box a{margin:0 7px; text-decoration:none;}
</style>


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
       alert('로그인 되었습니다.');

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
