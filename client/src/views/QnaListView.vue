<template>
  <!-- <h5 v-if="listId == '/mqnalist' && userno != ''">My Q & A</h5>
    <span v-if="currentList == '' && userno != ''">아직 리뷰가 없습니다.</span> -->
  <tr class="qnalist" :key="i" v-for="i in currentList">
    <td class="state">
      <span>{{ i.reply_state }}</span>
    </td>
    <td class="content">
      <span>{{ i.litecont }}</span>
    </td>
    <td class="writerdate">
      <span>{{ i.write_date }}</span>
    </td>
    <td class="writer">
      <span>{{ i.writer }}</span>
    </td>
    <td v-if="listId == '/mqnalist'" class="btns">
      <button v-if="listId == '/mqnalist' && userno != ''" @click="$emit('update', i.qna_no, i.qry_content)">수정</button>
      <button v-if="listId == '/mqnalist' && userno != ''" @click="DeleteMyQna(i.qna_no)">삭제</button>
    </td>
  </tr>
  <div class="pages" v-if="listId == '/qnalist'">
    <b-pagination v-model="currentPage" :total-rows="pagecnts" :per-Page="startCnt"
      @click="getQnaList(currentPage)"></b-pagination>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  props: {
    pcode: { type: String, default: '' },
    listId: { type: String, default: '' },
    refreon: { type: Boolean, default: false }
  },
  components: {
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
    if (this.listId != '/mqnalist') {
      this.getQnaList(this.currentPage);
    } else if (this.userno != '') {
      this.getMyQnaList();
    }
  },
  watch: {
    refreon(a) {
      if (a == true) {
        if (this.listId != '/mqnalist') {
          this.getQnaList(this.currentPage);
        } else if (this.userno != '') {
          this.getMyQnaList();
        }
        this.$emit('refresh', false);
      }
    },
  },
  methods: {
    async getQnaList(pgno) {
      let result = await axios.get(`/api/qnas${this.listId}${this.pcode}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data.list;
      this.pagecnts = result.data.pages[0].qacnt;
      this.$emit('allcntevt', this.pagecnts);
    },
    async getMyQnaList() {
      let result = await axios.get(`/api/qnas${this.listId}/${this.userno}${this.pcode}`)
        .catch(err => console.log(err));
      this.currentList = result.data;
    },
    async DeleteMyQna(qno) {
      let delchk = confirm('정말로 삭제하시겠습니까?');
      if (delchk) {
        await axios.delete(`/api/qnas/${qno}`)
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
