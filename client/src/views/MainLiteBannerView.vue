<template>
    <div class="container">

        <div class="banners col-lg-6 col-md-6 col-12">
            <div class="single-banner">
                <img src="../assets/thisyearbest.jpg" alt="#">
                <div class="content">
                    <router-link to="/book?bookNo=BK240311004" class="btn link">보러가기 +</router-link>
                </div>
            </div>
        </div>
        <div class="banners col-lg-6 col-md-6 col-12">
            <div class="single-banner">
                <img src="../assets/recommand.jpg" alt="#">
                <div class="content">
                    <router-link to="/book?bookNo=BK240311005" class="btn link">보러가기 +</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.banners {
    display: inline-block;
    margin-bottom: 100px;
}
.single-banner {
    position: relative;
    
}
.link {
    position: absolute;
    top:85%;
    right: 10%;
    cursor: pointer;
    background:rgba(0, 0, 0, 0.4);
    border-radius:50px;
    padding:5px 20px;
    color: #fff;
    letter-spacing:-1px;
}
.link:hover{
    position: absolute;
    top:85%;
    right: 10%;
    cursor: pointer;
    background:rgba(0, 0, 0, 0.8);
    border-radius:50px;
    padding:5px 20px;
    color: #fff;
    letter-spacing:-1px;
}
</style>