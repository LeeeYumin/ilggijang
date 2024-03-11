<template>
    <button type="button" class="btn px-4 btn-outline-primary" @click="openPostcode()">우편번호 검색</button>
</template>

<style scoped>
    button{margin-top:-4px;}
</style>

<script>
export default {
    emits : ['postcode'],
    methods : {
        openPostcode() {
            new window.daum.Postcode({
                oncomplete : (data) => {
                    this.$emit('postcode', data.zonecode, data.roadAddress);
                    
                }
            }).open();
        }
    }
}
</script>