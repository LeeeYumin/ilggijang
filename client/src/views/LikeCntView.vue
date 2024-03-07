<template>
  <button @click="checkcnt()">{{ likec }}</button>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    rno: { type: Number }
  },
  data() {
    return {
      userno: this.$store.state.userNo,
      likec: 0
    }
  },
  create() {
    this.getLikeCnt();
  },
  methods: {
    async checkcnt() {
      await axios.get(`/api/reviews/like/${this.userno}/${this.rno}`)
        .catch(err => console.log(err));
    },
    async getLikeCnt() {
      let result = await axios.get(`/api/reviews/like/${this.rno}`)
        .catch(err => console.log(err));
        this.likec = result.data;
    }
  }
}
</script>

<style scoped></style>
