<template>
  <tr class="qnastitle">
    <th>상태</th>
    <th>문의 내용</th>
    <th>작성일</th>
    <th>작성자</th>
  </tr>
  <span v-if="currentList == ''">내용 없음</span>
  <tbody class="qnas" :key="i" v-for="i in currentList">
    <tr class="link"
      @click.capture="i.qna_no != qno ? qno = i.qna_no : qno = '', state = i.reply_state, uno = i.user_no, cont = i.qry_content, rcont = i.reply_content">
      <td class="state">
        <span>{{ code(i.reply_state) }}</span>
      </td>
      <td class="content">
        <span>{{ liteCont(i.qry_content) }}</span>
      </td>
      <td class="writerdate">
        <span>{{ i.write_date }}</span>
      </td>
      <td class="writer">
        <span>{{ i.writer }}</span>
      </td>
    </tr>
    <UpdateQnaView v-if="qno == i.qna_no" :repstate="state" :qano="`/` + qno" :usno="uno" :qcont="cont" :acont="rcont"
      @refreon="(e) => {this.refreon = e, qno = ''}" />
  </tbody>
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
      refreon: false,
      userno: this.$store.state.userNo,
      uno: null,
      qno: '',
      state: '',
      cont: '',
      rcont: ''
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
      if(this.userno == ''){
        this.userno = 0;
      }
      let result = await axios.get(`/api/qnas${this.listId}${this.pcode}/${this.userno}/${((pgno - 1) * this.startCnt)}`)
        .catch(err => console.log(err));
      this.currentList = result.data.list;
      this.pagecnts = result.data.pages[0].qacnt;
      this.$emit('allcntevt', this.pagecnts);
    },
    liteCont(cont) {
      let litecont = cont.substr(0, 30);
      return litecont + `${cont.length > 30 ? ".." : ""}`; //
    },
    chk(data) {
      console.log(data);
    },
    code(wd) {
      if (wd == 'a2') {
        return '<답변완료>';
      } else {
        return '<답변대기>';
      }
    }
  }
}
</script>

<style scoped>
.qnalist {
  padding: 20px;
}

.link:hover td{
  cursor:pointer;
  background:#f3f5fd;
}
.qnas, .qnastitle{
    border-bottom: 1px solid #ddd;
    font-size: 15px;
}
th{background:#fbfbfb;}
th, td{
    padding:10px;
    text-align: center;
}
.pages{position:absolute; left:50%; bottom:0; width:100%; margin:20px auto 0; text-align:center; transform:translateX(-50%);} 
.justify-content-start{justify-content:center !important;}
</style>
