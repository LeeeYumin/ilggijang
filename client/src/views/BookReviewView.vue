<template>
    <div class="container">
        <div class="myreviews">
            <Reviews listId="/mrvlist" pcode="/BK240228002" />
        </div>
        <div class="rtop">
            <div class="title">
                <h3>상품 리뷰</h3>
            </div>
            <div class="a">
                <div class="selectmenu">
                    <select name="select" id="select" v-model="solt">
                        <option value="3" >좋아요순</option>
                        <option value="4">최신순</option>
                        <option value="5">평점순</option>
                    </select>
                </div>
                <div class="btn">
                    <button>리뷰 등록</button>
                </div>
            </div>
        </div>
        <div class="previews">
            <Reviews listId="/rvlist" pcode="/BK240228002" :soltno="`/`+solt" />
            <!-- Reviews로 정보를 넘겨주는 곳. 상품 코드, 정렬 컬럼번호(3~5)를 받아야함-->
        </div>
    </div>
</template>

<script>
import Reviews from '../views/ReviewView.vue'

export default {
    components: {
        Reviews
    },
    data(){
        return {
            solt: 3
        }
    },
}
</script>

<style scoped>
.container {
    margin: 0 auto;
}
.rtop .a .btn .selectmenu{
    display: inline-block;
}
.title{
    float: left;
}
.a .btn .selectmenu{
    float: right;
    
}
.a {
    width: 500px;
}
</style>
