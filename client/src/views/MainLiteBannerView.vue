<template>
    <div class="container">

        <div class="banners col-lg-6 col-md-6 col-12">
            <div class="single-banner">
                <img src="../assets/thisyearbest.jpg" alt="#">
                <div class="content">
                    <button type="button" class="btn link">보러가기</button>
                </div>
            </div>
        </div>
        <div class="banners col-lg-6 col-md-6 col-12">
            <div class="single-banner">
                <img src="../assets/recommand.jpg" alt="#">
                <div class="content">
                    <button type="button" class="btn link">보러가기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.link:hover {
    text-decoration: underline;
    cursor: pointer;
    color:#7ee1ff
}
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
    color: #00c3ff;
}
</style>