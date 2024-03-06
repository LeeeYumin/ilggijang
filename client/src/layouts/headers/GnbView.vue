
<!-- import { turn } from 'core-js/core/array'; -->
<template>
    <div>
        <div>

          <b-button-group>         
              <b-button  type="button" v-if="isLogin"  @click="logout" variant="outline-primary" >
                로그아웃 
              </b-button>
            <router-link v-else to="/login">
                <b-button variant="outline-primary">
                  로그인
                </b-button>
              </router-link>   
                <router-link to="/userjoin">
                  <b-button variant="outline-primary">
                    회원가입
                  </b-button>
                  </router-link>
                
                <router-link to="/cart">
                    <b-button variant="outline-primary">
                      장바구니
                    </b-button>
                </router-link>
                <router-link to="/order">
                    <b-button variant="outline-primary">
                      주문/결제(임시)
                    </b-button>
                </router-link>
            </b-button-group>
        </div>
    </div>
</template>
<script>
export default{
  components:{

  },
  data(){
    return{
      isLogin:this.$store.state.isLogin,
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('vuex');
        this.$store.commit('setIsLogin', false);
        this.$store.commit('setId', '');
        this.$store.commit('setUserNo', '');
      location.href="/main"
    }
    
  }
  
}
</script>

<style scoped>
div {
    text-align: right;
}
</style>
