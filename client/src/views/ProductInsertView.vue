<template>
  <div class="container">
    <form @submit.prevent >

    <h1>상품관리</h1> <!--메모 API 토스트-->

      <label for="prdt_no">상품번호
        
      </label>
      <input type="text" id="no" v-model="boardInfo.no">

      <label for="title">제목</label>
      <input type="text" id="title"  v-model="boardInfo.title">

      <label for="writer">작성자</label>
      <input type="text" id="writer" v-model="boardInfo.writer">

      <label for="content">내용</label>
      <textarea id="content" style="height:200px" v-model="boardInfo.content"></textarea>

      <label for="regdate">작성일자</label>
      <input type="text" id="regdate" v-model="boardInfo.created_date" >

    </form>

  </div>
</template>

<script>
// import axios from 'axios'

</script>

<style>

</style>
