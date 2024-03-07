<template>
  <div class="container">
    <h1>상품관리</h1>
      <table class="table">
        <thead>
          <tr>
            <th>도서이미지</th>
            <th>도서명</th>
            <th>도서번호</th>
            <th>저자</th>
            <th>출판사</th>
            <th>가격</th>
          </tr>
        </thead>

    <tbody>
      <tr>
    <td>{{  }}</td>
    <td>{{  }}</td>
    <td>{{  }}</td>
    <td>{{  }}</td>
    <td>{{  }}</td>
    <td>{{  }}</td>
      </tr>
     </tbody>
    </table>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
    data(){
        return {
      
        }
    },
    
    watch: {
      // "userList가 바뀌면 뭘 하겠다"
      userList(newQuestion, oldQuestion) {
        console.log('이전 : ' + oldQuestion);
        // alert('데이터가 변경되었습니다.');
        console.log('이후 : ' + newQuestion);
      }
    },

    created() {
    },

    methods : {

  }
}


</script>
