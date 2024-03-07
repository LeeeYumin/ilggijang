<template>
  <div class="visual">
    <div class="container">

    </div>
  </div>
  <div class="container">
    <MainBookListView />

    <!-- 자식 컴포넌트 -->
    <router-view />
  </div>
</template>

<script>
import MainBookListView from './MainBookListView.vue';

export default {
    components: {
      MainBookListView
    }
}
</script>

<style scoped>
.visual{width:100%; height:400px; background:#ddd;}
.visual .container{margin-top:0;}
.main {
  width: 100%;
  margin: 0 auto;
}
.container{margin-top:70px;}
</style>
