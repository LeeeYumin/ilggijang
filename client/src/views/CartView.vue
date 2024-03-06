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
                                name="checkbox-1"
                                value="accepted"
                                unchecked-value="not_accepted"
                                v-model="checkAll"
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
                                    v-model="checkBox"
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
                        <p class="price"><i class="point">{{ formatPrice(list.total_price) }}</i>원</p> 
                        <!-- 이전에 한거 perTotalPrice(idx, list.book_price) -->
                        <div class="btn_num">
                            <button @click="quantityMin(idx)"><span><i>수량 빼기</i></span></button>
                                <input type="text" v-model="this.cartList[idx].quantity">
                            <button @click="quantityPlus(idx)"><span><i>수량 더하기</i></span></button>
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
                <span><i class="point">{{ formatPrice(totalBookPrice) }}</i>원</span>
            </li>
            <li>
                <p>배송비</p>
                <span>{{ formatPrice(dlvAmount) }}원</span>
            </li>
        </ul>
        <div class="total">
        <p>결제 예정 금액</p>
        <span><i>{{ formatPrice(totalPrice) }}</i>원</span>
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
            cartList : [],
            checkBox : []
        }
    },
    computed : {
        count() {
            return this.cartList.length;
        },
        totalBookPrice() {
            let result = 0;
            for(let i = 0; i < this.cartList.length; i++){
                result += this.cartList[i].total_price;
                console.log('값', result);
            }
            return result;
        },
        dlvAmount() {
            let result = 0;
            for(let i = 0; i < this.cartList.length; i++){
                let total_price = this.cartList[i].quantity * this.cartList[i].book_price;
                if(total_price < 15000) {
                    result = 3000;
                }
            }
            return result;
        },
        totalPrice() {
            let result = 0;
            result = this.totalBookPrice + this.dlvAmount;
            return result;
        },
        checkAll : { 
            get: function(){
                if((this.checkBox.length != this.cartList.length) || this.cartList.length == 0)
                    return false;
                else
                    return true;							
            },
            set: function(e){
                if(e){
                    for(let i = 0; i < this.cartList.length; i++){
                        this.checkBox.push(this.cartList[i].checkBox);
                    }	
                }
                else{
                    this.checkBox = [];
                }          
            }
        }
    },
    created(){
        // let bno = this.$route.query.bno;
        this.getCartList();
    },
    methods : {
        async getCartList(){
            let userNo = this.$store.state.userNo;  
            console.log('회원번호', userNo);
            let result = await axios.get('/api/cart/' + userNo) 
                                    .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
            let list = result.data;
            console.log(list);
            this.cartList = list;
            console.log('데이터', this.cartList);
        },
        quantityPlus(i) {
            this.cartList[i].quantity += 1;
            this.cartList[i].total_price = this.cartList[i].quantity * this.cartList[i].book_price;
        },
        quantityMin(i) {
            if(this.cartList[i].quantity <= 1){
                this.cartList[i].quantity = 1;
                alert('1개 이하의 수량은 선택하실 수 없습니다.');
            } else {
                this.cartList[i].quantity -= 1;
                this.cartList[i].total_price = this.cartList[i].quantity * this.cartList[i].book_price;
            }
        },
        formatPrice(book_price) {
            if (book_price > 999) {
                let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
                let idx = 0;
                while (priceAry.length > idx + 3) {
                priceAry.splice(idx + 3, 0, ',');
                idx += 4;
                }
                return priceAry.reverse().join('') //reverse 함수임
            } else {
                return book_price
            }
        },
        allCheck() {

        }
    }
}
</script>