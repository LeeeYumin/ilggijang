<template>
    <div class="container">
        <!-- 메뉴 -->
        <div class="menu container">
            <ul>
                <li>
                    <router-link to="/recommendBookMenu">
                        <span>추천도서</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/bestsellerBookMenu">
                        <span>베스트셀러</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/categoryBookMenu">
                        <span>분야별 인기도서</span>
                    </router-link>
                    <!-- <ul>
                        <li>
                            <router-link to="/categoryBookMenu">
                                <span>시/에세이</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/categoryBookMenu">
                                <span>소설</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/categoryBookMenu">
                                <span>인문</span>
                            </router-link>
                        </li>
                    </ul> -->
                </li>
                <li>
                    <router-link to="/notice">
                        <span>공지사항</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/mypage">
                        <span class="my">마이페이지</span>
                    </router-link>
                    <!-- <ul>
                        <li>
                            <router-link to="">
                                <span>내정보</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <span>내리뷰</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <span>찜</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <span>1:1문의</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <span>내 주문내역</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="">
                                <span>회원탈퇴</span>
                            </router-link>
                        </li>
                    </ul> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container{text-align:center;}
    .menu{margin:0 auto; text-align:center;}
    .menu ul{list-style:none;}
    .menu > ul > li{display:inline-block; margin:0 40px;}
    a{text-decoration:none;}
    span{display:block; position:relative; color:#333; font-size:16px; letter-spacing:-0.5px;; font-weight:700;}
    span:hover:after{content:''; display:block; position:absolute; left:0; bottom:0; width:100%; height:1px; border-bottom:1px solid #333;}
    .my{position:relative;}
    .my:before{content:'M'; display:block; position:absolute; right:-22px; top:-10px; width:20px; height:20px; border-radius:50%; background:#3a4ca8; color:#fff; font-size:10px; font-weight:700; line-height:1.2rem;}

</style>
