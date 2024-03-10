<template>
    <div class="container">
        <h1>FAQ</h1>
        <table class="table">
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
          <td>{{ notice.title }}</td>
          <td>{{ notice.content }}</td>
          <td>{{ notice.reg_date }}</td>
          <td>{{ notice.hit_cnt }}</td>
   

        </tr>
       
            </tbody>
        </table>
      
    </div>
</template>