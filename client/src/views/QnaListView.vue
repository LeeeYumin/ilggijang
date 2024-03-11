<template>
  <!-- <h5 v-if="listId == '/mqnalist' && userno != ''">My Q & A</h5>
    <span v-if="currentList == '' && userno != ''">아직 리뷰가 없습니다.</span> -->
    <tr class="link" :key="i" v-for="i in currentList" @click.capture="infoOn = true, state = i.reply_state, qno = i.qna_no, uno = i.user_no">
      <td class="state">
        <span>{{ i.reply_state }}</span>
      </td>
      <td class="content" >
        <span>{{ i.litecont }}</span>
      </td>
      <td class="writerdate">
        <span>{{ i.write_date }}</span>
      </td>
      <td class="writer">
        <span>{{ i.writer }}</span>
      </td>
    </tr>
    <UpdateQnaView v-if="infoOn" :repstate="state" :qno="qno" :uno="uno" @refreon="(e) => this.refreon = e"/>

  <template>
  </template>

  <div class="pages">
    <b-pagination v-model="currentPage" :total-rows="pagecnts" :per-Page="startCnt"
    @click="getQnaList(currentPage)"></b-pagination>
  </div>
</template>


<script>
import axios from 'axios';
import UpdateQnaView from './UpdateQnaView.vue';


export default {
  props: {
    pcode: { type: String, default: '' },
    listId: { type: String, default: '' },
    // refreon: { type: Boolean, default: false }
  },
  components: {
    UpdateQnaView
  },
  emits: ['allcntevt', 'refresh'],
  data() { // listId: 목록 식별, startCnt: 페이지마다 표시할 상품 인덱스 시작 단위 
    return {
      currentList: [],
      currentPage: 1,
      startCnt: 5,
      pagecnts: 0,
      userno: this.$store.state.userNo,
      infoOn: false,
      uno: '',
      qno: '',
      state: '',

    }
  },
  created() {
    this.getQnaList(this.currentPage);
  },
  watch: {
    refreon(a) {
      if (a == true) {
        this.getQnaList(this.currentPage);
        this.refreon = false;
      }
    }
  },
  methods: {
    async getQnaList(pgno) {
      let result = await axios.get(`/api/qnas${this.listId}${this.pcode}/${this.userno}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data.list;
      this.pagecnts = result.data.pages[0].qacnt;
      this.$emit('allcntevt', this.pagecnts);
    },
    chk(data){
      console.log(data);
    }
  }
}
</script>

<style scoped>
.qnalist {
  padding: 20px;
}
.link .content span:hover{text-decoration:underline; cursor:pointer;}
</style>
