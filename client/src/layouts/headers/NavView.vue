<template>
    <div class="container">
        <!-- 메뉴 -->
        <b-nav pills class="py-3">
            <b-nav-item to="/recommendBookMenu">추천도서</b-nav-item>
            <b-nav-item to="/bestsellerBookMenu">베스트셀러</b-nav-item>
            <b-nav-item-dropdown id="my-nav-dropdown" text="분야별 인기도서" toggle-class="nav-link-custom" right>
                    <b-dropdown-item id="c02" to="/categoryBookMenu">시/에세이</b-dropdown-item>
                    <b-dropdown-item id="c01" to="/categoryBookMenu">소설</b-dropdown-item>
                    <b-dropdown-item id="c03" to="/categoryBookMenu">인문</b-dropdown-item>
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

<style scoped></style>
