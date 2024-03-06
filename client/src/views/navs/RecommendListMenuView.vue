<template>
  <div class="container">
    <h3>추천도서</h3>
    <div class="ages">
      <b-tabs content-class="mt-3"> 
        <b-tab title="10대" active><List code="z1"/></b-tab>
        <b-tab title="20대"><List code="z2"/></b-tab>
        <b-tab title="30대"><List code="z3"/></b-tab>
        <b-tab title="40대"><List code="z4"/></b-tab>
        <b-tab title="50대"><List code="z5"/></b-tab>
        <b-tab title="60대이상"><List code="z6"/></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import List from '../navs/RecommendListView.vue';

export default { 
  components: {
    List
  },
}
</script>

<style scoped>

</style>
