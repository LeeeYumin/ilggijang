<template>
    <div class="container">
        <RegisterModalView v-if="popupView == true" @close="popupView = false" :rno="`/`+uprno"/> <!-- 마이페이지 쪽으로 옮길 예정 -->
        <div class="myreviews">
            <ReviewListView listId="/mrvlist" pcode="/BK240228002" @update="(e) => {uprno = e, popupView = true}" :popupon="popupView"/>
        </div>
        <div class="rtop">
            <div class="title">
                <h3>상품 리뷰 ({{ reviewcnt }})</h3>
            </div>
            <div class="a">
                <div class="selectmenu">
                    <select name="select" id="select" v-model="solt">
                        <option value="3">좋아요순</option>
                        <option value="4">최신순</option>
                        <option value="5">평점순</option>
                    </select>
                </div>
                <div class="btn">
                    <button @click="loginchk()">리뷰 등록</button>
                </div>
            </div>
        </div>
        <div class="previews">
            <ReviewListView listId="/rvlist" pcode="/BK240228002" :soltno="`/` + solt" @allcntevt="(e) => reviewcnt = e" :popupon="popupView"/>
            <!-- Reviews로 정보를 넘겨주는 곳. 상품 코드, 정렬 컬럼번호(3~5)를 받아야함-->
            <!-- @현재 리뷰 갯수 갱신 -->
        </div>
    </div>
</template>

<script>
import ReviewListView from '../views/ReviewListView.vue'
import RegisterModalView from '../views/RegisterModalView.vue'

export default {
    components: {
        ReviewListView,
        RegisterModalView
    },
    data() {
        return {
            popupView: false,
            solt: 3,
            reviewcnt: 0,
            uprno: 5
        }
    },
    methods: {
        loginchk() {
            // if (this.$store.state.userNo != '') { // 로그인 체크
            let chk = confirm('리뷰 작성을 위해 마이페이지로 이동하시겠습니까?');
            if (chk) {
                this.popupView = true
            }
            // }
            else {
                alert('로그인이 필요합니다.');
            }
        }
    }
}

</script>

<style scoped>
.container {
    margin: 0 auto;
}

.rtop .a .btn .selectmenu {
    display: inline-block;
}

.title {
    float: left;
}

.a .btn .selectmenu {
    float: right;

}

.a {
    width: 500px;
}
</style>
