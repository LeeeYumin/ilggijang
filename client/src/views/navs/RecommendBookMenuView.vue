<template>
  <div class="container">
    <h3>추천도서</h3>
    <div class="ages">
      <b-tabs content-class="mt-3"> 
        <b-tab title="10대" active><List listId="/recdlist" code="/z1"/></b-tab>
        <b-tab title="20대"><List listId="/recdlist" code="/z2"/></b-tab>
        <b-tab title="30대"><List listId="/recdlist" code="/z3"/></b-tab>
        <b-tab title="40대"><List listId="/recdlist" code="/z4"/></b-tab>
        <b-tab title="50대"><List listId="/recdlist" code="/z5"/></b-tab>
        <b-tab title="60대이상"><List listId="/recdlist" code="/z6"/></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import List from '../../views/BookListView.vue';

export default { 
  components: {
    List
  },
}
</script>

<style scoped>

</style>
