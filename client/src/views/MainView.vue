<template>
  <div class="visual">
    <div class="container">

    </div>
  </div>
  <div class="container">
    <MainBookListView />
    <MainLiteBannerView />
    <MainBookListNewView />
    <!-- 자식 컴포넌트 -->
    <router-view />
  </div>
</template>

<script>
import MainBookListView from './MainBookListView.vue';
import MainBookListNewView from './MainBookListNewView.vue';
import MainLiteBannerView from './MainLiteBannerView.vue';

export default {
    components: {
      MainBookListView
      , MainBookListNewView
      , MainLiteBannerView
    }
}
</script>

<style scoped>
.visual{width:100%; height:400px; background:#ffe9dc url(../assets/bg_visual.jpg) 50% no-repeat;}
.visual .container{margin-top:0;}
.main {
  width: 100%;
  margin: 0 auto;
}
.container{margin-top:70px;}
</style>
