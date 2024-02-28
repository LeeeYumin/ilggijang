<template>
    <div>
        <b-nav pills>
            <b-nav-item active>추천도서</b-nav-item>
            <b-nav-item>베스트셀러</b-nav-item>
            <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="분야별 추천도서"
            toggle-class="nav-link-custom"
            right
            >
            <b-dropdown-item>시/소설</b-dropdown-item>
            <b-dropdown-item>에세이</b-dropdown-item>
            <b-dropdown-item>문학</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
    </div>
</template>

<style scoped>
td {
    border: 1px solid;
    border-collapse: collapse;
}
</style>
