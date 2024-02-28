<template>
  <div class="hello">
    <h6>{{ msg }}</h6>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 1280px;
  margin: 0, auto;
}
</style>
