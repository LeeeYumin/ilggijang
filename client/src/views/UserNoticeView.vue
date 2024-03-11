<template>
    <div class="container">
        <h3>공지사항</h3>
        <table class="table">
          <colgroup>
            <col spna="1" width="10%;">
            <col spna="1">
            <col spna="1">
            <col spna="1" width="15%;">
            <col spna="1" width="10%;">
          </colgroup>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>등록일</th>
                    <th>조회수</th>

                </tr>
            </thead>
            <tbody>
        <tr v-for="(notice, idx) in notice" v-bind:key="idx"
          v-on:click="goToNoticeInfo(notice.notice_no)">
          <td>{{ notice.notice_no }}</td>
          <td class="tit">{{ notice.title }}</td>
          <td>{{ notice.content }}</td>
          <td>{{ notiDate(notice.reg_date) }}</td>
          <td>{{ notice.hit_cnt }}</td>


        </tr>
       
            </tbody>
        </table>
      
    </div>
</template>

<style scoped>
  .container{padding-top:50px; margin-bottom:50px;}
  h3{font-weight:700;}
  .table{margin-top:20px; border-top:1px solid #111; text-align:center;}
  .table thead th{padding:12px 10px;}
  .table tbody tr{cursor:pointer;}
  .table tbody tr:nth-child(odd) td{background:#fbfbfb;}
  .table tbody tr:hover td{background:#f3f5fd;}
  .table tbody tr td{padding:10px;}
</style>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            notice : []
        }
    },
    computed: {
        count() {
        return this.notice.length;
      }
    },
    watch: {
      // "noticeList가 바뀌면 뭘 하겠다"
      notice(newQuestion, oldQuestion) {
        console.log('이전 : ' + oldQuestion);
        // alert('데이터가 변경되었습니다.');
        console.log('이후 : ' + newQuestion);
      }
    },
    created() {
      // 비동기작업
      this.getNotice(); 
    },
    methods : {
      // 동기 작업
      // async : 내부 코드를 동기식으로 바꾸는 것
      //         함수 자체는 여전히 비동기식
      async getNotice() {
        // axios: == primise
        // axios 코드 : 반드시 순서대로 진행되야 함
        //             why: 데이터가 와야 진행됨
        // proxy 사용시 상대경로 사용(내 경로를 지정한 경로로 변경) => '/api'로 시작('^/api')
        let result = await axios.get('/api/notice') // get 방식
                                .catch(err => console.log(err));
        let list = result.data;
        this.notice = list; // 이 코드가 돌 시점에 userList에 제대로 값 넘어와야함 => await
        
        // 동기식으로 처리(await) : then X
        // 비동기 식으로 처리 : then O
      },
      goToNoticeInfo(nno) {
        // 등록된 라우터에 대해 요청 메소드
        // 라우터는 무조건 get 방식(post X) => body 없음

        // path: 
        // query: 넘기는 부분 (key-value)
        //        여기서 정한 key를 받는 쪽에서도 알아야 함(받는 쪽: 새롭게 불려지는 컴포넌트)
        // $router.push: 통신을 요청 / $route : 통신을 받음
        this.$router.push({ path: '/userNoticeInfo', query: {'noticeNo' : nno}});
        // this.$router.push({ name: 'userInfo', query: {'userId' : userId}});  // name으로도 가능
      },
      notiDate(orderDate) {
          let result = null;
          if(orderDate != null){
              let date = new Date(orderDate);
              let year = date.getFullYear();
              let month = ('0' + (date.getMonth() + 1)).slice(-2);
              let day = ('0' + date.getDate()).slice(-2);             
              
              result = `${year}-${month}-${day}`;
              return result;
          }
          return ''
      }
    },
    // getToday() {
    //         let date = new Date();
    //         let year = date.getFullYear();
    //         let month = ('0' + (date.getMonth() + 1)).slice(-2);
    //         let day = ('0' + date.getDate()).slice(-2);
    //         return `${year}-${month}-${day}`;
    //     }
  }


</script>
