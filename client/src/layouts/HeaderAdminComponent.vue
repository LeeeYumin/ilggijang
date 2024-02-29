<template>
    <div class="header">
        <div class="container">
            <h1>관리자</h1>
            <Gnb />
        </div>
    </div>
</template>

<script>
import Gnb from '../layouts/headers/GnbView.vue';

export default {
    components: {
        Gnb
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
