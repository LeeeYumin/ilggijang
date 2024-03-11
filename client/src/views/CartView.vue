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
                    <td colspan="3" class="top_box">
                        <div class="all_box">
                            <b-form-checkbox
                                id="checkbox-1"
                                name="checkbox-1"
                                value="accepted"
                                v-model="selectAll"
                                ><i class="point">전체선택</i>
                            </b-form-checkbox>
                        </div>
                        <button class="btn btn-outline-secondary btn-sm" @click="cartAllDelete(this.cartList.userNo)">전체삭제</button>
                    </td>
                </tr>
                <tr v-bind:key="idx" v-for="(list, idx) in cartList">
                    <td>
                        <div class="book_info">
                            <div class="check_box">
                                <b-form-checkbox
                                    id="checkbox-1"
                                    name="checkbox-1"
                                    :value="list.prdt_no"
                                    v-model="selected"
                                    >
                                </b-form-checkbox>
                            </div>
                            <span class="img">{{ list.book_img }}</span>
                            <div class="txt">
                                <p>{{ list.book_name }}</p>
                                <span>{{ list.title }}</span>
                                <span><i class="s_point">{{ formatPrice(list.book_price) }}</i>원</span>
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
                        <button class="btn btn-outline-primary mr-0" @click="cartDelete(list.cart_no)">삭제</button>
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
        <button class="btn btn-primary btn_order" @click="orderLink(cartList.user_id)">주문하기</button>
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
.book_info .txt p{margin-bottom:5px; font-size:15px; font-weight:700;}
.book_info .txt span{display:block; font-size:14px;}
.btn_num{display:inline-block; position:relative; padding:2px 0; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;}
.btn_num > *{display:inline-block; vertical-align:middle;}
.btn_num button{padding:0; border:0; background:none;}
.btn_num button span{display:block; position:relative; width:25px; text-indent:100%; overflow:hidden; white-space:nowrap;}
.btn_num button span i{font-size:0;}
.btn_num button:first-child span:before{content:''; display:block; position:absolute; left:50%; top:50%; width:10px; height:2px; background:#888; transform:translate(-50%, -50%);}
.btn_num button:last-child span:before{content:''; display:block; position:absolute; left:50%; top:50%; width:10px; height:2px; background:#888; transform:translate(-50%, -50%);}
.btn_num button:last-child span:after{content:''; display:block; position:absolute; left:50%; top:50%; width:2px; height:10px; background:#888; transform:translate(-50%, -50%);}
.btn_num input{width:30px; text-align:center; border:0; font-size:14px; margin-bottom:0;}
.tc{text-align:center;}
.price{margin-bottom:5px;}
.mr-0{margin-right:0;}
.top_box:after{content:''; display:block; clear:both;}
.top_box button{float:right; margin-top:3px; margin-right:0;}
.all_box{float:left; padding:5px 0;}
.s_point{display:inline-block; margin-top:10px; font-style:normal; font-size:15px; font-weight:700;}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartList : [],
            selected: []
        }
    },
    computed : {
        count() {
            return this.cartList.length;
        },
        // selectCount() {
        //     let result = 0;
        //     if(this.selected.length > 0){
        //         for(let i = 0; i < this.cartList.length; i++){
        //             if(this.selected.includes(this.cartList[i].prdt_no)){
        //                 result += this.selected[i].length;
        //                 console.log('갯수', result);
        //             }
        //         }
        //     }
        //     return result;
        // },
        totalBookPrice() {
            let result = 0;
            if(this.selected.length > 0){
                for(let i = 0; i < this.cartList.length; i++){
                    if(this.selected.includes(this.cartList[i].prdt_no)){
                        result += this.cartList[i].total_price;
                        console.log('1', this.selectAll);
                        console.log('2', this.selected);
                        console.log('값', result);
                    }
                }
            }
            return result;
        },
        dlvAmount() {
            let result = 0;
            for(let i = 0; i < this.cartList.length; i++){
                if(this.totalBookPrice < 15000) {
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
        selectAll : { 
            //getter
            get: function(){
                if((this.selected.length != this.cartList.length) || this.cartList.length == 0)
                    return false;
                else
                    return true;							
            },
            //setter
            set: function(e){
                console.log('e', e)
                if(e){                    
                    for(let i = 0; i < this.cartList.length; i++){
                        this.selected.push(this.cartList[i].prdt_no);
                    }
                }
                else{
                    this.selected = [];
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
            let result = await axios.get('/api/cart/user/' + userNo) 
                                    .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
            let list = result.data;
            console.log(list);
            this.cartList = list;
            console.log('데이터', this.cartList);
        },
        quantityPlus(i) {
            this.cartList[i].quantity += 1;
            this.cartList[i].total_price = this.cartList[i].quantity * this.cartList[i].book_price;
            this.cartUpdate(i);
        },
        quantityMin(i) {
            if(this.cartList[i].quantity <= 1){
                this.cartList[i].quantity = 1;
                alert('1개 이하의 수량은 선택하실 수 없습니다.');
            } else {
                this.cartList[i].quantity -= 1;
                this.cartList[i].total_price = this.cartList[i].quantity * this.cartList[i].book_price;
                this.cartUpdate(i)
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
        cartUpdate(i) {
            // 실제 보낼 데이터 선별
            let data = {
                param : {
                    quantity : this.cartList[i].quantity
                }
            };

            // axios를 이용해 ajax
            axios
            .put(`/api/cart/${this.cartList[i].cart_no}`, data) // 누구걸 수정할건지 반드시 경로에 붙여야함
            .then(result => {
                // 3) 결과처리
                let count = result.changedRows; // changedRows -> 수정에만 쓰임
                if(count == 0) {
                    alert(`수량이 수정되지 않았습니다.`);
                }else {
                    alert(`수량이 수정되었습니다.`);
                    this.$router.push({ path : '/cart', query : { "cno" : this.cartList.cart_no }}); // push를 해서 component를 불러오는걸 재확인
                }
            })
            .catch(err => console.log(err));
        },
        getSendData() {
            let obj = this.cartList;
            let delData = ["cart_no", "user_no", "prdt_no"]; // update되면 안되는 대상(body에 들어가면 안됨)
            let newObj = {};
            let isTargeted = null;    
            for( let field in obj){ 
                isTargeted = false;
                for(let target of delData){
                    if(field == target) {
                        isTargeted = true;
                        break;
                    }            
                }
                if(!isTargeted){
                    newObj[field] = obj[field];
                }
            }

            let sendData = {
                "param" : newObj
            }
            return sendData;
        },
        async cartDelete(cno){
            // 서버에 해당 데이터를 삭제
            axios
            .delete(`/api/cart/${cno}`) 
            .then(result => {
                if(result.data.affectedRows != 0 && result.data.changedRows == 0) {
                    alert(`정상적으로 삭제되었습니다.`);
                    this.$router.push({ path : '/cart'});
                    this.getCartList();
                }else {
                    alert(`삭제되지 않았습니다.`);
                }
            })
            console.log('cno', cno);
        },
        async cartAllDelete(){
            let userNo = this.$store.state.userNo;  
            // 서버에 해당 데이터를 삭제
            axios
            .delete(`/api/cart/user/` + userNo) 
            .then(result => {
                if(result.data.affectedRows != 0 && result.data.changedRows == 0) {
                    alert(`정상적으로 삭제되었습니다.`);
                    this.$router.push({ path : '/cart'});
                    this.getCartList();
                }else {
                    alert(`삭제되지 않았습니다.`);
                }
            })
            console.log('uno', userNo);
        },
        orderLink(userId){
            if(this.totalBookPrice <= 0){
                alert('상품을 선택해주세요.');
            } else {
                let result = confirm(`상품을 주문하시겠습니까?`); // ${this.selectCount}개의 
                if( result ) {
                    // yes 
                    let selectItem = [];
                    for(let i = 0; i < this.cartList.length; i++){
                        if(this.selected.includes(this.cartList[i].prdt_no)){
                            selectItem.push({ 
                                                book_no : this.cartList[i].prdt_no,
                                                book_name : this.cartList[i].book_name,
                                                quantity : this.cartList[i].quantity,
                                                book_img : this.cartList[i].book_img,
                                                book_price : this.cartList[i].book_price,
                                                total_price : this.cartList[i].total_price
                                            });
                            sessionStorage.setItem("selectItem", JSON.stringify(selectItem));
                        }
                    }
                    this.$router.push({ path : '/order', query : { "id" : userId } });
                } 
            }
        }
    }
}
</script>