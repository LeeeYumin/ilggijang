<template>
  <button @click="checkcnt()">{{ likec }}</button>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    rno: { type: Number },
    cnt: { type: Number }
  },
  data() {
    return {
      userno: this.$store.state.userNo,
      likec: this.cnt
    }
  },
  methods: {
    async checkcnt() {
      let result = await axios.get(`/api/reviews/like/${this.userno}/${this.rno}`)
        .catch(err => console.log(err));
        this.likec = result.data.lcnt;
    },
  }
}
</script>

<style scoped></style>
