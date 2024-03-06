<template>
  <div class="dreviews">
    <div class="dreviewlist" :key="i" v-for="i in currentList">
      <div class="rtitle">
        <span v-if="listId == '/rvlist'">구매자명 : {{ i.writer }}</span>
        <span v-if="listId == '/mrvlist'">내가 쓴 리뷰</span> / <span>{{ i.write_date }}</span>
      </div>
      <div class="grade">
        <span :key="g" v-for="g in i.grade">★</span>
        <span>{{ i.grade }}.0</span> / <span>5.0</span>
      </div>
      <div class="rcontent">
        <span>{{ i.content }}</span>
      </div>
      <div class="rlikes">
        <span>Like <Likes :cnt="i.likes"/></span>
      </div>
    </div>
    <div class="pages" v-if="listId == '/rvlist'" >
      <b-pagination v-model="currentPage" :total-rows="pages" :per-Page="startCnt"
        @click="getReviewList(currentPage)"></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Likes from '../views/LikeCntView.vue';

export default {
  props: {
    pcode: { type: String, default: '' },
    listId: { type: String, default: '' },
    odnum: { type: String, default: '' }
  },
  components:{
    Likes
  },
  data() { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
    return {
      currentList: [],
      currentPage: 1,
      startCnt: 10,
      pages: 0,
      currentCode: null
    }
  },
  created() {
    if (this.listId == '/rvlist') {
      this.makePage();
    }
    this.getReviewList(this.currentPage);

  },
  methods: {
    async getReviewList(pgno) {
      let result = await axios.get(`/api/reviews${this.listId}${this.pcode}${this.odnum}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async makePage() {
      let result = await axios.get(`/api/reviews${this.listId}${this.pcode}`)
        .catch(err => console.log(err));
      this.pages = result.data[0].pcnt;
    },
  }
}
</script>

<style scoped>
.reviewlist {
  padding: 20px;
}
</style>
