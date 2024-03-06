
import { turn } from 'core-js/core/array';
<template>
    <div>
        <div>
            <b-button-group>
                <router-link to="/login" v-if="isLogin">
                  <b-button variant="outline-primary">
                    로그아웃
                  </b-button>
                </router-link>

                <router-link to="/login" v-else>
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
export default {
  components: {
  },
  data() {
    return {
      isLogin: this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
div {
    text-align: right;
}
</style>
