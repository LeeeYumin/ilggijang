<template>
    <div class="container">
        <div class="title">
            <h3>상품 리뷰</h3>
            <div class="btn">
                <button>리뷰 등록</button>
            </div>
        </div>
        <div class="myreviews">
            <Reviews listId="/mrvlist" pcode="/BK240228002" userno="/1"/>
        </div>
        <div class="selectmenu">
            <select name="select" id="select">
                <option value="likes">좋아요순</option>
                <option value="dates">최신순</option>
                <option value="grades">평점순</option>
            </select>
        </div>
        <div class="previews">
            <Reviews listId="/rvlist" pcode="/BK240228002" odnum="/5"/><!-- Reviews로 정보를 넘겨주는 곳. 상품 코드, 정렬 컬럼번호(3~5)를 받아야함-->
        </div>
    </div>
</template>

<script>
import Reviews from '../views/ReviewView.vue'

export default {
    components: {
        Reviews
    }
}
</script>

<style scoped></style>
