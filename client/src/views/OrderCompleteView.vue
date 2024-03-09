<template>
  <div class="container">
    <div class="complete_box">
      <span class="book">
        <font-awesome-icon icon="fa-regular fa-circle-check" size="3x" bounce style="--fa-animation-duration : 3s; color : #3a4ca8; "/>
      </span>
      <h3>주문이 완료되었습니다.</h3>
      <router-link to="/main"><button class="btn btn-outline-primary">쇼핑 계속</button></router-link>
      <router-link to="/main"><button class="btn btn-primary">주문내역상세</button></router-link>
    </div>
    
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .book{display:block; margin-bottom:15px;}
  .container{display:flex; justify-content:center; align-items:center; position:relative; min-height:480px; margin-bottom:50px;}
  .complete_box{width:60%; padding:50px 20px; text-align:center; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
  .complete_box h3{margin-bottom:30px; font-size:25px; font-weight:700; letter-spacing:-1px;}
</style>