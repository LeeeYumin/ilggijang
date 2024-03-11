<template>
    <div class="container">
        <!-- <RegisterModalView v-if="popupView == true" @save="popupView = false, refre = true" @close="popupView = false"
            :rno="`/` + uprno" 
            :rgrade="upgrade"
            :rcontent ="upcontent"
            :rodtno ="upodtno"/> -->
        <div class="qtop">
            <div class="title">
                <h5>Q & A ({{ spcnt }})</h5>
                <div class="btn">
                    <button @click="loginchk()">상품 문의하기</button>
                </div>
            </div>
            <div class="myqnas">
                <table>
                    <QnaListView listId="/qnalist" :pcode="`/` + bno" @allcntevt="(e) => spcnt = e" />
                    <!-- @allcntevt 전체 목록 갯수 갱신 -->
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import QnaListView from './QnaListView.vue';
// import RegisterModalView from '../views/RegisterModalView.vue'

export default {
    components: {
        QnaListView
        // RegisterModalView
    },
    data() {
        return {
            bno: '', // 상품 식별 번호
            popupView: false, // 모달 팝업 여부
            // refre: false, // 목록 새로 그리기 여부
            spcnt: 0, // 목록의 총 갯수
            upqano: 0, // 내용 수정시 식별 번호
            upcontent: '' // 내용 수정시 초기값
        }
    },
    created() {
        this.bno = this.$route.query.bookNo;
    },
    methods: {
        loginchk() {
            if (this.$store.state.userNo != '') { // 로그인 체크

            }
            else {
                alert('로그인후 이용해주세요');
            }
        }
    }
}

</script>

<style scoped>
.container {
    margin: 0 auto;
}


</style>
