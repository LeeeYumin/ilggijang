<template>
<div class="container mt-5">
    <h3 class="mb-4 title">주문/배송 조회</h3>
    <div class="content">
        <table class="table">
            <colgroup>
                <col span="1">
                <col span="2" style="width:10%;">
                <col span="1" style="width:15%;">
            </colgroup>
            <tbody>
                <tr>
                    <td colspan="3"><i class="point p-2">배송</i></td>
                </tr>
                <tr v-bind:key="idx" v-for="(list, idx) in orderDetailList">
                    <td>
                        <div class="book_info">
                            <span class="img" @click="goDetailBook(list.prdt_no)">
                                <img :src="require('@/assets/product/' + list.book_img)" alt="cover">
                            </span>
                            <div class="txt">
                                <p>{{ list.book_name }}</p>
                                <span>수량 : {{ list.quantity }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="tc"><i class="point">{{ formatPrice(list.unit_price) }}</i>원</td>
                    <td class="tc"><i class="point color">{{ list.orders_state }}</i></td>
                    <td class="tc">
                        <button class="btn btn-outline-primary mr-0" @click="cartDelete(list.cart_no)">취소신청</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h5>배송정보</h5>
        <table class="table dlv_tbl">
            <colgroup>
                <col span="1" style="width:20%;">
                <col span="1" style="width:80%;">
            </colgroup>
            <tbody>
                <tr>
                    <td><p class="fs">기본정보</p></td>
                    <td>
                        <div class="addr_info">
                            <p>{{ this.orderInfo.recipient }} / {{ this.orderInfo.phone }}</p>
                            <p>{{ this.orderInfo.dlv_addr }}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <h5>결제정보</h5>
        <div class="pay_info">
            <div class="left">
                <ul>
                    <li class="tit">
                        <p>주문금액</p>
                        <span><i class="point">{{ formatPrice(this.orderInfo.total_orders_amount + this.orderInfo.dlv_amount) }}</i>원</span>
                    </li>
                    <li>
                        <p>상품 금액</p>
                        <span><i class="point">{{ formatPrice(this.orderInfo.total_orders_amount) }}</i>원</span>
                    </li>
                    <li>
                        <p>배송비</p>
                        <span><i class="point">{{ formatPrice(this.orderInfo.dlv_amount) }}</i>원</span>
                    </li>
                </ul>
            </div>
            <div class="center">
                <ul>
                    <li class="tit">
                        <p>할인금액</p>
                        <span><i class="point">{{ formatPrice(this.orderInfo.dc_amount) }}</i>원</span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li class="tit">
                        <p>결제금액</p>
                        <span><i class="point">{{ formatPrice(this.orderInfo.total_pay_amount) }}</i>원</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn_box">
            <router-link to="/mypage/myorderlist"><button class="btn btn-primary">주문/배송 목록</button></router-link>
        </div>
    </div>
</div>
</template>

<style scoped>
.title{font-weight:700;}
.content{position:relative; min-height:480px; margin-bottom:50px;}
.all{padding:15px; background:#f7f7f7; border-radius:10px; box-sizing:border-box;}
.table{margin-bottom:0; border-top:1px solid #111;}
.table tr{border-bottom:1px solid #ddd;}
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
.book_info .img{width:100px; background:#ddd; cursor:pointer; box-shadow:0 0 5px 2px rgba(0, 0, 0, 0.1);}
.book_info .img img{display:block; width:100%; height:100%;}
.book_info .txt{margin-left:20px;}
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
.btn_num input{width:30px; text-align:center; border:0; font-size:14px;}
.tc{text-align:center;}
.price{margin-bottom:5px;}
.mr-0{margin-right:0;}
.all_box{padding:5px 0;}
.s_point{display:inline-block; margin-top:10px; font-style:normal; font-size:15px; font-weight:700;}
h5{margin-top:50px; color:#333; font-weight:700;}
h5 + table{margin-top:15px;}
.pay_info{margin-top:15px; padding:30px 0; border-top:1px solid #111; border-bottom:1px solid #ddd; box-sizing:border-box;}
.pay_info ul{margin:0; padding:0; list-style:none;}
.pay_info li p{float:left; font-size:14px; color:#555; margin-bottom:5px;}
.pay_info li.tit p{margin-bottom:15px; color:#333; font-size:15px; font-weight:700;}
.pay_info li span{display:block; float:right; color:#555; font-size:14px;}
.pay_info li:not(.tit) span i{font-size:15px !important;}
.pay_info li.tit span{color:#333; font-size:15px;}
.pay_info .left{padding-left:0;}
.pay_info > div{position:relative; float:left; padding-left:50px; width:33.33333333333333%;}
.pay_info > div:before{content:''; display:block; position:absolute; left:25px; top:-5px; width:1px; height:100px; border-left:1px dashed #ddd;}
.pay_info > div.left:before{display:none;}
.pay_info:after,
.pay_info li:after{content:''; display:block; clear:both;}
.fs{font-size:15px;}
.btn_box{margin-top:30px; text-align:center;}
.btn_box button{padding:10px 30px;}
.dlv_tbl p{margin-bottom:0 !important;}
.addr_info{padding:15px 0; font-size:15px;}
.addr_info p:first-child{margin-bottom:5px !important; font-weight:700;}
.addr_info p{margin-bottom:10px;}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            orderDetailList : [],
            orderInfo : {
                name : '',
                dlv_addr : '',
                phone : '',
                recipient : '',
                user_rank_no : '',
                total_orders_amount : '',
                total_pay_amount : '',
                dlv_amount : '',
                dc_amount : ''
            },
            selectedPay : ''
            // orderDetailList : JSON.parse(sessionStorage.getItem("orderItem"))
        }
    },
    computed : {
        
    },
    created(){
        let orderNo = this.$route.query.orderNo; // 받는건 route, router 아님 주의
        this.getOrderList(orderNo);
        this.getOrderInfo(orderNo);
    },
    methods : {
        async getOrderList(orderNo){
            console.log('주문번호', orderNo);
            // http://localhost:3000/orderdetail/orderlist/104
            let result = await axios.get('/api/orderdetail/orderlist/' + orderNo) 
                                    .catch(err => console.log(err)); 
            let list = result.data;
            this.orderDetailList = list;
            console.log('데이터', this.orderDetailList);
        },
        async getOrderInfo(orderNo){
            let result = await axios.get('/api/orders/' + orderNo) // + no
                        .catch(err => console.log(err));
            console.log(result);
            this.orderInfo = result.data;
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
        goDetailBook(bno) { // 이미지 클릭하면 상세화면으로.
            this.$router.push({ path : '/book', query : { 'bookNo' : bno }});
        }
    }
}
</script>