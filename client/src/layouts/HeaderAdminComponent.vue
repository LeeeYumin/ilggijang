<template>
  <nav class="navbar navbar-dark bg-dark">
    <span class="text-light p-3">관리자님, 오늘도 좋은 하루 되세요 :)</span>
    <form class="form-inline">
      <router-link to="/main">
        <button class="btn btn-outline-success" type="button">메인사이트로 이동</button>
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
