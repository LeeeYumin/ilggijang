<template>
    <div class="header">
        <div class="gnb">
            <h3>gnb</h3>
            <Gnb />
        </div>
        <div class="search">
            <h3>검색영역</h3>
            <Search />
        </div>
        <div class="nav">
            <h3>메뉴</h3>
            <Nav />
        </div>
    </div>
</template>

<script>
import Gnb from '../layouts/headers/GnbView.vue';
import Search from '../layouts/headers/SearchView.vue';
import Nav from '../layouts/headers/NavView.vue';

export default {
    components: {
        Gnb,
        Search,
        Nav
    }
}

</script>

<style scoped>
.header {
    width: 960px;
    margin: 0 auto;
    background: #eee;
}
.gnb, nav {
    border: 1px solid #888;
}

</style>
