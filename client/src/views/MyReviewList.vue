<template>
    <div class="container mt-5">
        <h3 class="mb-4 title">내리뷰</h3>
        <div class="content">
            <div class="order_list">
                <ul>
                    <li v-bind:key="idx" v-for="(list, idx) in myOrderList">
                        <div>
                            <!-- <p class="tit point p-2">{{ list.orders_date }}</p> -->
                            <p class="tit point p-2">{{ orderDate(list.orders_date) }} <span class="detail_go" @click="goToDetail(list.orders_no)">상세보기 ></span></p>
                            <table class="table">
                                <colgroup>
                                    <col span="1">
                                    <col span="2" style="width:10%;">
                                    <col span="1" style="width:15%;">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="book_info">
                                                <span class="img">{{ list.book_img }}</span>
                                                <div class="txt">
                                                    <p>{{ list.book_name }} {{ bookQuantity(list.count) }}</p>
                                                    <span>수량 : {{ list.count }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="tc"><i class="point">{{ formatPrice(list.order_price) }}</i>원</td>
                                        <td class="tc"><i class="point color">{{ list.orders_state }}</i></td>
                                        <td class="tc">
                                            <button class="btn btn-outline-primary mr-0" @click="cartDelete(myOrderList.cart_no)">취소신청</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <h1>{{ bookQuantity() }}</h1>
    </template>
    
    <style scoped>
    .title{font-weight:700;}
    .tit{display:block; padding:15px 0 !important; margin-bottom:0;}
    .content{position:relative; min-height:480px; margin-bottom:50px;}
    .all{padding:15px; background:#f7f7f7; border-radius:10px; box-sizing:border-box;}
    .table{margin-bottom:0;}
    .table tr{border-bottom:1px solid #ddd;}
    .container{padding:0;}
    .gray_box{padding:20px; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
    .point{display:inline-block; font-size:18px; font-weight:700;}
    .color{color:#0d6efd; font-weight:700;}
    i.point{font-style:normal; font-size:16px;}
    .border_bottom{border-bottom:1px solid #ddd;}
    table{vertical-align:middle;}
    table td{border-top:1px solid #ddd;}
    ul{list-style:none; padding-left:0;}
    ul li{border-top:1px solid #111;}
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
    .pay_info li.tit span{color:#333; font-size:15px;}
    .pay_info .left{padding-right:30px; border-right:1px dashed #ddd;}
    .pay_info .right{padding-left:30px;}
    .pay_info > div{float:left; width:50%;}
    .pay_info:after,
    .pay_info li:after{content:''; display:block; clear:both;}
    .fs{font-size:15px;}
    .btn_box{margin-top:30px; text-align:center;}
    .btn_box button{padding:10px 30px;}
    .detail_go{margin-left:10px; color:#777; font-size:13px; letter-spacing:-0.5px; cursor:pointer;}
    </style>
    
    <script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                myOrderList: []
            }
        },
        created(){
            let userNo = this.$route.query.userNo;
            this.getOrderList(userNo);
        },
        computed : {
            
        },
        methods : {
            async getOrderList(){
                let userNo = this.$store.state.userNo;  
                console.log('회원번호', userNo);
                // http://localhost:3000/orders/mypage/myorderlist/2
                let result = await axios.get('/api/orders/mypage/myorderlist/' + userNo) 
                                        .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
                let list = result.data;
                this.myOrderList = list;
                console.log('데이터', this.myOrderList);
            },
            orderDate(orderDate) {
                let result = null;
                if(orderDate != null){
                    let date = new Date(orderDate);
                    let year = date.getFullYear();
                    let month = ('0' + (date.getMonth() + 1)).slice(-2);
                    let day = ('0' + date.getDate()).slice(-2);             
                    
                    result = `${year}-${month}-${day}`;
                    return result;
                }
                return ''
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
            bookQuantity(cnt) {
                let result = '';
                if(cnt > 1) {
                    result = ` 외 ${(cnt - 1)}권`;
                }
                return result;
            },
            goToDetail(orderNo){
                // let orderItem = [];
                // for(let i = 0; i < this.myOrderList.length; i++){
                //     if(this.selected.includes(this.myOrderList[i].orders_no)){
                //         orderItem.push({ 
                //             book_no : this.myOrderList[i].prdt_no,
                //             book_name : this.myOrderList[i].book_name,
                //             quantity : this.myOrderList[i].quantity,
                //             book_img : this.myOrderList[i].book_img,
                //             book_price : this.myOrderList[i].book_price,
                //             total_price : this.myOrderList[i].total_price,
                //             orders_state : this.myOrderList[i].orders_state
                //         });
                //         sessionStorage.setItem("orderItem", JSON.stringify(orderItem));
                //     }
                // }
                this.$router.push({ path : '/orderlist', query : { "orderNo" : orderNo } }); // query는 무조건 객체타입
            }
        }
    }
    </script>