<template>
  <div class="reviews">
    <h5 v-if="listId == '/mrvlist' && userno != ''">내가 쓴 리뷰</h5>
    <span v-if="currentList == '' && userno != ''">아직 리뷰가 없습니다.</span>
    <div class="reviewlist" :key="i" v-for="i in currentList">
      <div class="top">
        <div class="writerdate">
          <span v-if="listId == '/rvlist'">구매자명 : {{ i.writer }} / </span>
          <span>{{ i.write_date }}</span>
          <div v-if="listId == '/mrvlist' && userno != ''" class="btns">
            <button @click="$emit('update', i.review_no, i.grade, i.content, i.orders_detail_no)">수정</button>
            <button @click="DeleteMyReview(i.review_no)">삭제</button>
          </div>
        </div>
        <div class="grade">
          <span :key="g" v-for="g in i.grade"><font-awesome-icon :icon="['fas', 'star']" style="color: #66dd70;" /></span>
          <span :key="g" v-for="g in 5-i.grade"><font-awesome-icon :icon="['far', 'star']" style="color: #66dd70;" /></span>
          <span>{{ i.grade }}.0</span> / <span>5.0</span>
        </div>
      </div>
      <div class="content">
        <span>{{ i.content }}</span>
      </div>
      <div class="likes" v-if="listId == '/rvlist'">
        <span>Like
          <Likes :rno="i.review_no" :cnt="i.likes" />
        </span>
      </div>
    </div>
    <div class="pages" v-if="listId == '/rvlist'">
      <b-pagination v-model="currentPage" :total-rows="pagecnts" :per-Page="startCnt"
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
    refreon: { type: Boolean, default: false }
  },
  components: {
    Likes
  },
  emits: ['allcntevt', 'update', 'refresh'],
  data() { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
    return {
      currentList: [],
      currentPage: 1,
      startCnt: 5,
      pagecnts: 0,
      currentCode: null,
      userno: this.$store.state.userNo
    }
  },
  created() {
    if (this.listId != '/mrvlist') {
      this.getReviewList(this.currentPage);
    } else if (this.userno != '') {
      this.getMyReviewList();
    }
  },
  watch: {
    soltno() {
      this.$emit('refresh', true);
    },
    refreon(a) {
      if (a == true) {
        if (this.listId != '/mrvlist') {
          this.getReviewList(this.currentPage);
        } else if (this.userno != '') {
          this.getMyReviewList();
        }
        this.$emit('refresh', false);
      }
    },
  },
  methods: {
    async getReviewList(pgno) {
      let result = await axios.get(`/api/reviews${this.listId}${this.pcode}${this.soltno}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data.list;
      this.pagecnts = result.data.pages[0].pcnt;
      this.$emit('allcntevt', this.pagecnts);
    },
    async getMyReviewList() {
      let result = await axios.get(`/api/reviews${this.listId}/${this.userno}${this.pcode}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async DeleteMyReview(rno) {
      let delchk = confirm('정말로 삭제하시겠습니까?');
      if (delchk) {
        await axios.delete(`/api/reviews/${rno}`)
          .catch(err => console.log(err));
        alert('삭제되었습니다.');
        this.$emit('refresh', true);
      }
    }
  }
}
</script>

<style scoped>
.reviewlist {
  padding: 20px;
}
</style>
