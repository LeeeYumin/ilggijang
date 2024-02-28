<template>
    <div class="logo">
        <img src="#">
    </div>
    <div class="scinput">
        <div>
            <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
            <div class="mt-2">Value: {{ text }}</div>
        </div>
        <button class="btn btn-primary">검색</button>
    </div>
    <div class="hotkwrd">
        <h6>인기검색어 자리</h6>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>

<style scoped>
#logo {
    text-align: left;
}
#scinput {
    margin: 0 auto;
}
#hotkwrd {
    margin: 0 auto;
}
</style>
