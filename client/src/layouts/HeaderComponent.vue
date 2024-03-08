<template>
    <div class="header">
        <div class="container">
            <div class="gnb">
                <Gnb />
            </div>
            <Search />
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
    width: 100%;
    margin: 0 auto;
    background: #fff; border-bottom:1px solid rgba(0, 0, 0, 0.1);
}
.header > .container{position:relative;}
.gnb{position:absolute; top:20px; right:0; z-index:1;}


</style>
