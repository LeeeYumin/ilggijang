<template>
  <div class="reviews">
    <h3 v-if="listId == '/mrvlist' && userno != ''">내가 쓴 리뷰</h3>
    <h4 v-if="currentList == ''">아직 리뷰가 없습니다.</h4>
    <div class="reviewlist" :key="i" v-for="i in currentList">
      <div class="top">
        <div class="writerdate">
          <span v-if="listId == '/rvlist'">구매자명 : {{ i.writer }} / </span>
          <span>{{ i.write_date }}</span>
        </div>
        <div class="grade">
          <span :key="g" v-for="g in i.grade">★</span>
          <span>{{ i.grade }}.0</span> / <span>5.0</span>
        </div>
      </div>
      <div class="content">
        <span>{{ i.content }}</span>
      </div>
      <div class="likes" v-if="listId == '/rvlist'">
        <span>Like
          <Likes :rno="i.review_no"/>
        </span>
      </div>
    </div>
    <div class="pages" v-if="listId == '/rvlist'">
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
    soltno: { type: String, default: '' },
  },
  components: {
    Likes
  },
  data() { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
    return {
      currentList: [],
      currentPage: 1,
      startCnt: 10,
      pages: 0,
      currentCode: null,
      userno : this.$store.state.userNo
    }
  },
  created() {
    if (this.listId != '/mrvlist') {
      this.makePage();
      this.getReviewList(this.currentPage);
    } else if (this.userno != '') {
      this.getMyReviewList();
    }
  },
  methods: {
    async getReviewList(pgno) {
      let result = await axios.get(`/api/reviews${this.listId}${this.pcode}${this.soltno}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async makePage() {
      let result = await axios.get(`/api/reviews${this.listId}${this.pcode}`)
        .catch(err => console.log(err));
      this.pages = result.data[0].pcnt;
    },
    async getMyReviewList() {
      let result = await axios.get(`/api/reviews${this.listId}/${this.userno}${this.pcode}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
  }
}
</script>

<style scoped>
.reviewlist {
  padding: 20px;
}
</style>
