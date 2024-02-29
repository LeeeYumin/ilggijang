<template>
    <div class="container">
        <!-- 메뉴 -->
        <b-nav pills>
            <b-nav-item active>추천도서</b-nav-item>
            <b-nav-item>베스트셀러</b-nav-item>
            <b-nav-item-dropdown id="my-nav-dropdown" text="분야별 추천도서" toggle-class="nav-link-custom" right>
                <b-dropdown-item>시/소설</b-dropdown-item>
                <b-dropdown-item>에세이</b-dropdown-item>
                <b-dropdown-item>문학</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item>공지사항</b-nav-item>
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
