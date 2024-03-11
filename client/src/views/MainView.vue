<template>
  <div id="carouselExampleControls" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="2000"><img class="d-block w-100" src="../assets/bg_visual.png" /></div>
    <div class="carousel-item" data-bs-interval="2000"><img class="d-block w-100" src="../assets/bg_visual01.png" /></div>
    <div class="carousel-item" data-bs-interval="2000"><img class="d-block w-100" src="../assets/bg_visual02.png" /></div>
    <div class="carousel-item" data-bs-interval="2000"><img class="d-block w-100" src="../assets/bg_visual03.png" /></div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span> 
  </button>
</div>
  <div class="container">
    <MainBookListView />
    <MainLiteBannerView />
    <MainBookListNewView />
    <!-- 자식 컴포넌트 -->
    <router-view />
  </div>
</template>

<script>
import MainBookListView from './MainBookListView.vue';
import MainBookListNewView from './MainBookListNewView.vue';
import MainLiteBannerView from './MainLiteBannerView.vue';

export default {
    components: {
      MainBookListView
      , MainBookListNewView
      , MainLiteBannerView
    }
}
</script>

<style scoped>
#carouselExampleControls{width:100%; height:400px; background:#ffe9dc url(../assets/bg_visual.jpg) 50% no-repeat;}
.carousel-inner,
.carousel-item,
.carousel-item img{height:100%;}
.visual .container{margin-top:0;}
.main {
  width: 100%;
  margin: 0 auto;
}
.container{margin-top:70px;}
</style>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
