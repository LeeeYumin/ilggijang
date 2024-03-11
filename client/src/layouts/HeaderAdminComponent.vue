<template>
  <nav class="navbar navbar-dark bg-dark">
      <router-link to="/admin">
            <img src="@/assets/ilggijang_logo.png" style="width: 100px; margin-left: 30px;">
      </router-link>
    <form class="form-inline">
      <span class="text-light">관리자님, 오늘도 좋은 하루 되세요 :)</span>
      <router-link to="/main">
        <button class="btn btn-outline-success mx-3" type="button">메인사이트로 이동</button>
      </router-link>
      <button @click="logout" class="btn btn-outline-success" type="button">로그아웃</button>
    </form>
  </nav>
</template>

<script>


export default {
    components: {
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
.header {
    width: 100%;
    margin: 0 auto;
    background: #eee;
}


</style>
