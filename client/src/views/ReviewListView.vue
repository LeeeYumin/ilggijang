<template>
  <div class="reviews">
    <h5 v-if="listId == '/mrvlist' && userno != ''">내가 쓴 리뷰</h5>
    <span class="no_data" v-if="currentList == '' && userno != ''">아직 리뷰가 없습니다.</span>
    <div class="reviewlist" :key="i" v-for="i in currentList">
      <div class="top">
        <div class="writerdate">
          <span v-if="listId == '/rvlist'"><i>구매자명</i> {{ i.writer }} | </span>
          <span>{{ i.write_date }}</span>
          <div v-if="listId == '/mrvlist' && userno != ''" class="btns">
            <button @click="$emit('update', i.review_no, i.grade, i.content, i.orders_detail_no, i.book_name)">수정</button>
            <button @click="DeleteMyReview(i.review_no)">삭제</button>
          </div>
        </div>
        <div class="grade">
          <span :key="g" v-for="g in i.grade"><font-awesome-icon :icon="['fas', 'star']" style="color: #3a4ca8;" /></span>
          <span :key="g" v-for="g in 5-i.grade"><font-awesome-icon :icon="['far', 'star']" style="color: #3a4ca8;" /></span>
          <span class="num">{{ i.grade }}.0</span> / <span>5.0</span>
        </div>
      </div>
      <div class="content">
        <span>{{ i.content }}</span>
      </div>
      <div class="likes" v-if="listId == '/rvlist'">
        <span><font-awesome-icon icon="fa-regular fa-thumbs-up" size="lg" />
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
h3{font-weight:700; letter-spacing:-0.5px;}
.reviewlist{margin-bottom:5px; padding-top:15px; padding-bottom:10px; border-top:1px dashed #ddd;}
.reviewlist:first-child{border-top:0;}
.reviews{margin-top:20px; border:1px solid #ddd; border-radius:15px; padding:30px; box-sizing:border-box;}
.reviews .no_data{display:block; margin:20px 0; text-align:center;}
.previews{margin-top:10px;}
.top:after{content:''; display:block; clear:both;}
.reviewlist .top .writerdate{float:left;}
.writerdate{color:#555; font-size:15px; letter-spacing:-1px;}
.writerdate span i{font-weight:700; font-style:normal;}
.content{margin-top:10px;}
.content span{display:inline-block; color:#555;}
.grade{float:right; color:#555; font-size:14px;}
.grade .num{margin-left:5px; font-weight:700;}
h5{font-weight:700;}
.likes{margin-top:5px;}
.likes button{border:0; background:none; color:#3a4ca8; font-weight:700;}
.pages{margin-top:20px;}
.justify-content-start{justify-content:center !important;}
</style>
