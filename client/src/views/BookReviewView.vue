<template>
    <div class="container">
        <RegisterModalView v-if="popupView == true" @save="popupView = false, refre = true" @close="popupView = false"
            :rno="`/` + uprno" 
            :rgrade="upgrade"
            :rcontent ="upcontent"
            :rodtno ="upodtno"
            :rbnm = "upbnm"/> <!-- 등록은 마이페이지 쪽으로 옮길 예정 -->
        <div class="myreviews">
            <ReviewListView listId="/mrvlist" :pcode="`/`+bno"
                @update="(eno, egrade, econtent, eodtno, ebnm) => {
                 uprno = eno,
                 upgrade = egrade,
                 upcontent = econtent,
                 upodtno = eodtno,
                 upbnm = ebnm,
                 popupView = true,
                 refre = false
                 }" @refresh="(e) => refre = e"
                :refreon="refre" />
        </div>
        <div class="rtop">
            <div class="title">
                <h5>상품 리뷰 ({{ reviewcnt }})</h5>
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
            <ReviewListView listId="/rvlist" :pcode="`/`+bno" :soltno="`/` + solt"
                @allcntevt="(e) => reviewcnt = e" @refresh="(e) => refre = e" :refreon="refre" />
            <!-- Reviews로 정보를 넘겨주는 곳. 상품 코드, 정렬 컬럼번호(3~5)를 받아야함-->
            <!-- @allcntevt 현재 리뷰 갯수 갱신 -->
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
            bno: '',
            popupView: false,
            refre: false,
            solt: 3,
            reviewcnt: 0,
            
            uprno: 0,
            upgrade: 0,
            upcontent: '',
            upodtno: 0
        }
    },
    created() {
        this.bno = this.$route.query.bookNo;
    },
    methods: {
        loginchk() {
            if (this.$store.state.userNo != '') { // 로그인 체크
                let chk = confirm('\'마이페이지\' > \'내주문내역\'으로 이동하시겠습니까?');
                if (chk) {
                    this.$router.push({ path: '/mypage/myorderlist' });
                }
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
