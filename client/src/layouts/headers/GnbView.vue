<!-- import { turn } from 'core-js/core/array'; -->

<template>
  <div>
    <div class="top_box">
      <b-button-group>
        <b-button class="btn_top" v-if="isLogin" @click="logout">
          <p>로그아웃</p>
        </b-button>

        <router-link v-else to="/login">
          <b-button class="btn_top">
            <p>로그인</p>
          </b-button>
        </router-link>

        <router-link to="/userjoin">
          <b-button class="btn_top">
            <p>회원가입</p>
          </b-button>
        </router-link>

          <b-button class="btn_top" @click="goCart()">
            <p>장바구니</p>
          </b-button>

        <router-link to="">
          <b-button class="btn_top">
            <p class="last">고객센터</p>
          </b-button>
        </router-link>
      </b-button-group>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';


export default {
  components: {
    
  },
  data() {
    return {
      isLogin: this.$store.state.isLogin
    }
  },
  methods: {
    logout() {
      const slog = this.$store.state.loginTypeCode;
      
      if(slog == 'j1'){

      
      localStorage.removeItem('vuex');
      
      this.$store.commit('setIsLogin', false);
      this.$store.commit('setId', '');
      // this.$store.commit('setUserNo', '');
      this.$store.commit('setLoginTypeCode', '');
      
           
      location.href = "/main"
    }else{
      
      
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        localStorage.removeItem('com.naver.nid.access_token');
        localStorage.removeItem('vuex');
        
        location.href = "/main"

       
      
     
    }
    },
    goCart() {
      if(!this.isLogin) {
        alert('로그인이 필요합니다.');
        this.$router.push({path : '/login'});
      } else {
        this.$router.push({path : '/cart'});
      }
    }



  }

}
</script>

<style scoped>
.top_box{text-align:right;}
.top_box button{position:relative; margin:0; text-align:center; background:#fff !important; border-color:#fff !important;}
.btn_top{margin-left:5px; background:none; border:0;}
.btn_top:hover,
.btn_top:focus,
.btn_top:visited{background:none;}
.top_box p{position:relative; color:#555; font-size:13px; letter-spacing:-0.5px;}
.top_box p:after{content:''; display:block; position:absolute; right:-12px; top:4px; width:1px; height:13px; border-left:1px solid #ccc; z-index:2;}
.top_box p.last:after{display:none;}
</style>
