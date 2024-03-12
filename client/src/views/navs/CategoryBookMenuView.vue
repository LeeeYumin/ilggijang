<template>
  <div class="container">
    <h3>분야별 인기도서</h3>
    <div class="ages">
      <b-tabs content-class="mt-3"> 
        <b-tab :title="category('c01')" active><List listId="/catlist" code="/c01"/></b-tab>
        <b-tab :title="category('c02')"><List listId="/catlist" code="/c02"/></b-tab>
        <b-tab :title="category('c03')"><List listId="/catlist" code="/c03"/></b-tab>
        <b-tab :title="category('c04')"><List listId="/catlist" code="/c04"/></b-tab>
        <b-tab :title="category('c05')"><List listId="/catlist" code="/c05"/></b-tab>
        <b-tab :title="category('c06')"><List listId="/catlist" code="/c06"/></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import List from '../../views/BookListView.vue';

export default { 
  components: {
    List
  },
  methods:{
    category(category) {
      let result = '';
      switch(category) {
        case 'c01': 
          result = '소설';
          break;
        case 'c02':
          result = '시/에세이';
          break;
        case 'c03':
          result = '인문';
          break;
        case 'c04':
          result = '가정/육아';
          break;
        case 'c05':
          result = '경제/경영';
          break;
        case 'c06':
          result = '자기계발';
          break;
        case 'c07':
          result = '역사/문화';
          break;
        case 'c08':
          result = '예술/대중문화';
          break;
        case 'c09':
          result = '외국어';
          break;
        case 'c10':
          result = '과학';
          break;
        case 'c11':
          result = '취업/수험서';
          break;
        case 'c12':
          result = '여행';
          break;
        case 'c13':
          result = '컴퓨터/IT';
          break;
        case 'c14':
          result = '청소년';
          break;
         case 'c15':
          result = '어린이(초등)';
          break;
        }
        return result;
      }
  }
}
</script>

<style scoped>
.container{padding-top:50px;}
h3{font-weight:700;}
.ages{margin-top:30px;}
</style>
