<template>
    <div class="container">
        <!-- 메뉴 -->
        <b-nav pills class="py-3">
            <router-link to="/recommendList">
                <b-nav-item active>추천도서</b-nav-item>
            </router-link>
            <router-link to="/bestSellerList">
                <b-nav-item >베스트셀러</b-nav-item>
            </router-link>
            <b-nav-item-dropdown id="my-nav-dropdown" text="분야별 인기도서" toggle-class="nav-link-custom" right>
                <router-link to="/categoryBookList?catid=c02">
                    <b-dropdown-item>시/에세이</b-dropdown-item>
                </router-link>
                <router-link to="/categoryBookList?catid=c01">
                    <b-dropdown-item value="소설">소설</b-dropdown-item>
                </router-link>
                <router-link to="/categoryBookList?catid=c03">
                    <b-dropdown-item>인문</b-dropdown-item>
                </router-link>
            </b-nav-item-dropdown>
            <router-link to="/notice">
            <b-nav-item>공지사항</b-nav-item>
        </router-link>
            <b-nav-item-dropdown id="my-nav-dropdown" text="마이페이지" toggle-class="nav-link-custom" right>
                <b-dropdown-item>내정보</b-dropdown-item>
                <b-dropdown-item>내리뷰</b-dropdown-item>
                <b-dropdown-item>찜</b-dropdown-item>
                <b-dropdown-item>1:1문의</b-dropdown-item>
                <b-dropdown-item>내 주문내역</b-dropdown-item>
                <b-dropdown-item>회원탈퇴</b-dropdown-item>
            </b-nav-item-dropdown>

        </b-nav>
    </div>
</template>

<style scoped>

</style>
