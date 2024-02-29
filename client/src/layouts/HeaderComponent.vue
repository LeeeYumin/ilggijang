<template>
    <div class="header">
        <div class="container">
            <Gnb />
        </div>
        <div class="container">
            <Search />
        </div>
        <div class="container">
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
    background: #eee;
}


</style>
