<template>
<div class="container mt-5">
    <h3 class="mb-4 title">장바구니 ({{ count }})</h3>
    <div class="content">
    <div class="left">
        <div>
            <table class="table">
            <colgroup>
                <col span="1">
                <col span="1" style="width:15%;">
                <col span="1" style="width:10%;">
            </colgroup>
            <tbody>
                <tr>
                    <td colspan="3">
                        <div class="all_box">
                            <b-form-checkbox
                                id="checkbox-1"
                                v-model="status"
                                name="checkbox-1"
                                value="accepted"
                                unchecked-value="not_accepted"
                                ><i class="point">전체선택</i>
                            </b-form-checkbox>
                        </div>
                    </td>
                </tr>
                <tr v-bind:key="idx" v-for="(list, idx) in cartList">
                    <td>
                        <div class="book_info">
                            <div class="check_box">
                                <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="status"
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                    >
                                </b-form-checkbox>
                            </div>
                            <span class="img">{{ list.book_img }}</span>
                            <div class="txt">
                                <p>{{ list.book_name }}</p>
                                <span>{{ list.title }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="tc">
                        <p class="price"><i class="point">{{ list.book_price }}</i>원</p>
                        <div class="btn_num">
                            <button><span><i>수량 빼기</i></span></button>
                            <input type="text" value="1">
                            <button><span><i>수량 더하기</i></span></button>
                        </div>
                    </td>
                    <td class="tc">
                        <button class="btn btn-outline-primary mr-0">삭제</button>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
    <div class="right">
        <ul>
            <li>
                <p>상품금액</p>
                <span><i class="point">{{ totalBookPrice }}</i>원</span>
            </li>
            <li>
                <p>배송비</p>
                <span>0원</span>
            </li>
        </ul>
        <div class="total">
        <p>결제 예정 금액</p>
        <span><i>{{ totalBookPrice }}</i>원</span>
        </div>
        <button class="btn btn-primary btn_order" @click="getImPort()">주문하기 ({{ count }})</button>
    </div>
    </div> 
</div>
</template>

<style scoped>
.title{font-weight:700;}
.content{position:relative; min-height:480px; margin-bottom:50px;}
.content:after{content:''; display:block; clear:both;}
.left{float:left; width:calc(100% - 28%);}
.right{float:right; width:25%; padding:20px; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
.right ul{list-style:none; padding-left:0; margin-bottom:0;}
.right .total{padding-top:20px; border-top:1px solid #ddd;}
.right .total p{margin-bottom:0; font-weight:700; line-height:27px;}
.right .total i{font-size:18px; font-weight:700;}
.right li:after,
.right .total:after{content:''; display:block; clear:both;}
.right p{float:left; font-size:14px;}
.right span{float:right;}
.right span i{font-style:normal;}
.right .btn_order{margin-top:20px; width:100%; padding:10px 0;}
.all{padding:15px; background:#f7f7f7; border-radius:10px; box-sizing:border-box;}
.table{margin-bottom:0; border-top:1px solid #111;}
.table tr{border-bottom:1px solid #ddd;}
.table tr td{border-left:1px solid #ddd;}
.table tr td:first-child{border-left:0;}
.container{padding:0;}
.gray_box{padding:20px; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
.point{display:inline-block; font-size:18px; font-weight:700;}
.color{color:#0d6efd; font-weight:700;}
i.point{font-style:normal; font-size:16px;}
.border_bottom{border-bottom:1px solid #ddd;}
table{vertical-align:middle;}
table ul{list-style:none; margin-top:20px; padding-left:0;}
table ul li{display:inline-block; margin-left:10px;}
table ul li:first-child{margin-left:0;}
table ul li button{width:120px; height:50px; font-weight:700; border:1px solid #ddd; background:#fff; border-radius:5px;}
table ul li button:hover{background:#eee;}
.book_info{padding:20px 0;}
.book_info > *{display:inline-block; vertical-align:top;}
.book_info .img{background:#ddd;}
.book_info .txt{margin-left:10px;}
.book_info .txt p{margin-bottom:10px; font-size:15px; font-weight:700;}
.book_info .txt span{display:block; font-size:14px;}
.btn_num{display:inline-block; position:relative; padding:2px 0; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;}
.btn_num > *{display:inline-block; vertical-align:middle;}
.btn_num button{padding:0; border:0; background:none;}
.btn_num button span{display:block; position:relative; width:25px; text-indent:100%; overflow:hidden; white-space:nowrap;}
.btn_num button span i{font-size:0;}
.btn_num button:first-child span:before{content:''; display:block; position:absolute; left:50%; top:50%; width:10px; height:2px; background:#888; transform:translate(-50%, -50%);}
.btn_num button:last-child span:before{content:''; display:block; position:absolute; left:50%; top:50%; width:10px; height:2px; background:#888; transform:translate(-50%, -50%);}
.btn_num button:last-child span:after{content:''; display:block; position:absolute; left:50%; top:50%; width:2px; height:10px; background:#888; transform:translate(-50%, -50%);}
.btn_num input{width:30px; text-align:center; border:0; font-size:14px;}
.tc{text-align:center;}
.price{margin-bottom:5px;}
.mr-0{margin-right:0;}
.all_box{padding:5px 0;}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartList : []
        }
    },
    computed : {
        count() {
            return this.cartList.length;
        },
        totalBookPrice() {
            let result = 0;
            result = + this.cartList.book_price;
            return result;
        },
        makeComma() {
            let total = this.totalBookPrice;
            // toString() 숫자 -> 문자열
            // replace(정규표현식, "대체문자열")
            // 정규표현식 \B(63개 문자에 일치하는 경계), {n}(n개) \d(숫자) g(전역검색)
            // x(?=y) -> "x" 뒤에 "y"가 오는 경우에만 "x"와 일치
            // x(?!y) -> "x" 뒤에 "y"가 없는 경우에만 "x"와 일치
            
            return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");       
        }
    },
    created(){
        // let searchNo = this.$route.query.userNo;
        this.getCartList();
    },
    methods : {
        async getCartList(){
            let userNo = this.$store.state.userNo;  
            console.log('회원번호', userNo);
            let result = await axios.get(`/api/user/${userNo}`) 
                                    .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
            let list = result.data;
            this.cartList = list;
        }
    }
}
</script>