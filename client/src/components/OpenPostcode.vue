<template>
    <button type="button" class="btn border-secondary px-4 text-primary" @click="openPostcode()">우편번호 검색</button>
</template>

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