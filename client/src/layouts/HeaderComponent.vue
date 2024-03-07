<template>
    <div class="header container">
        <div class="gnb">
            <Gnb />
        </div>
        <div>
            <Search />
        </div>
        <div>
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
    position:relative;
    width: 100%;
    margin: 0 auto;
    background: #fff;
}
.gnb{position:absolute; top:20px; right:0; z-index:1;}


</style>
