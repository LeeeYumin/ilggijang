<template>
    <div class = "detailUpLeft" >
      <img src = {{ bookInfo.img }}>
      <p> 카테고리 : {{ bookInfo.categoty }}</p>
    </div>
    <div class= "detailUpRight">
      <div class = "book_info1">
        <span></span>
      </div>

    </div>

    <div class="detailDown">

    </div>

</template>

<script>
// import axios from 'axios';

  export default {
    data() {
      return {
        bookInfo : {
          isbn : '',
          name : '',
          img : '',
          title : '',
          publco : '',
          price : '',
          intro : '',
          exp : '',
          publdate : '',
          categoty : ''
        }

    }
  }
}
</script>

<style>

</style>