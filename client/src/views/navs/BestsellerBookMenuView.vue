<template>
  <div class="container">
    <h3>베스트셀러</h3>
    <div class="bests">
      <List listId="/bestlist"/>
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
  .container{padding-top:50px;}
  h3{font-weight:700;} 
</style>
