<template>
<footer class="footer">
    <div class="container">
      <div class="row">
        <div class="left">
          <router-link to="main">
            <img src="@/assets/ilggijang_logo.png" style="width: 80px;" class="filter">
          </router-link>
        </div>
        <div class="right">
          <div class="txt">
            <p><span>대구광역시 중구 중앙대로</span> <span>053)-000-0000</span> <span>개발자 : 장효은, 신수지, 이유민, 도승민, 박지웅</span></p>
            <p></p>
            <p class="copy">Copyright © {{ new Date().getFullYear() }} 읽기장.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer{padding:30px 0 50px; border:1px solid #ddd;}
  .footer .row{position:relative;}
  .footer .left{position:absolute; left:0; top:0;}
  .footer .right{padding-left:130px; padding-top:10px;}
  .footer .right .txt p{margin-bottom:3px; font-size:15px; letter-spacing:-0.5px;}
  .footer .right .txt p span{display:inline-block; position:relative; padding-left:20px;}
  .footer .right .txt p span:after{content:''; display:block; position:absolute; left:7px; top:4px; width:1px; height:15px; border-left:1px solid #aaa;}
  .footer .right .txt p span:first-child{padding-left:0;}
  .footer .right .txt p span:first-child:after{display:none;}
  .copy{margin-top:5px; color:#888;}
  .filter{filter:grayscale(100%); opacity:0.5;}
</style>
