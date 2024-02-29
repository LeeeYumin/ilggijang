<template>
<footer class="footer py-3">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <span><img src="#">로고이미지</span>
        </div>
        <div class="col-8 mx-auto text-center mt-1">
          <p class="mb-3 text-secondary">
            Copyright © {{ new Date().getFullYear() }} 읽기장.
          </p>
          <p class="mb-0 text-secondary">
                대구광역시 중구 중앙대로
            </p>
            <p class="mb-0 text-secondary">
                053)-000-0000
            </p>
            <p class="mb-3 text-secondary">
              개발자 : 장효은, 신수지, 이유민, 도승민, 박지웅
            </p>
        </div>
        <div class="col-2">
          <span class="btn btn-primary">고객센터</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background: #eee;
  }
</style>
