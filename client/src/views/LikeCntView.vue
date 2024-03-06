<template>
    <button @click="checkcnt(cnt)">{{cnt}}</button>
</template>

<script>
// import axios from 'axios';

export default {
  props: {
    cnt: { type: Number }
  },
  methods: {
    // async checkcnt(cnt) {
    //   let result = await axios.post(`/api/reviews/${this.userId}`)
    //     .catch(err => console.log(err));
    // }
  }
}
</script>

<style scoped>

</style>
