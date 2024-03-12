<template>
    <div class="container mt-5">
        <RegisterModalView v-if="popupView == true" @save="popupView = false, refresh = true" @close="popupView = false"
            :rno="`/` + uprno"
            :rpno="uprpno"
            :rgrade="upgrade"
            :rcontent ="upcontent"
            :rodtno ="upodtno"
            :rbnm = "upbnm"/>
        <h3 class="mb-4 title">내리뷰</h3>
        <div class="content">
            <div class="order_list">
                <ul>
                    <li :key="idx" v-for="(list, idx) in myList">
                        <div>
                            <!-- <p class="tit point p-2">{{ list.orders_date }}</p> -->
                            <p class="tit point p-2">{{ list.write_date }} </p>
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
                                                <span :key="g" v-for="g in list.grade"><font-awesome-icon :icon="['fas', 'star']" style="color: #3a4ca8;" /></span>
                                                <span :key="g" v-for="g in 5-list.grade"><font-awesome-icon :icon="['far', 'star']" style="color: #3a4ca8;" /></span>
                                                <div class="txt">
                                                    <p>{{ liteCont(list.content) }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="tc"><i class="point color">{{ liteCont(list.book_name) }}</i></td>
                                        <td class="tc">
                                            <button class="btn btn-outline-primary mr-0" 
                                            @click="popupView = true,
                                            uprno= list.review_no,
                                            upgrade= list.grade,
                                            upcontent = list.content,
                                            upodtno = list.orders_detail_no,
                                            uprpno = list.prdt_no,
                                            upbnm = list.book_name">수정</button>
                                            <button class="btn btn-outline-primary mr-0" @click="DeleteMyReview(list.review_no)">삭제</button>
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
    import RegisterModalView from './RegisterModalView.vue';

    export default {
        data() {
            return {
                myList: [],
                uno: this.$store.state.userNo,
                refresh: false,
                popupView: false,

                uprno: 0,
                upgrade: 0,
                upcontent: '',
                upodtno: 0,
                uprpno: ''
            }
        },
        created(){
            this.getList();
        },
        components:{
            RegisterModalView
        },
        watch:{
            refresh(a){
                if(a == true){
                    this.getList();
                    this.refresh = false;
                }
            }
        },
        methods: {
            async getList(){
                console.log('회원번호', this.uno);
                let result = await axios.get(`/api/reviews/mmrvlist/${this.uno}`) 
                                        .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
                this.myList = result.data;
                console.log('데이터', this.myList);
            },
            liteCont(cont) {
                let litecont = cont.substr(0, 30);
                return litecont + `${cont.length > 30 ? ".." : ""}`;
            },
            async DeleteMyReview(rno) {
                let delchk = confirm('정말로 삭제하시겠습니까?');
                if (delchk) {
                await axios.delete(`/api/reviews/${rno}`)
                    .catch(err => console.log(err));
                alert('삭제되었습니다.');
                this.refresh = true;
                }
            }
        }
    }
    </script>