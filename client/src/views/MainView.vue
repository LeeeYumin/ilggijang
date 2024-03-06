<template>
  <div class="container my-5">
    <h1>메인영역</h1>
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
.main {
  width: 100%;
  margin: 0 auto;
}
</style>
