<template>
    <div class="container mt-5">
        <h3 class="mb-4 title">찜</h3>
        <div class="content">
            <div class="save_list">
                <diV class="save_all">
                    <div class="all_box">
                        <b-form-checkbox
                            id="checkbox-1"
                            name="checkbox-1"
                            value="accepted"
                            v-model="selectAll"
                            ><i class="point">전체선택</i>
                        </b-form-checkbox>
                    </div>
                    <div class="btn_box">
                        <button class="btn btn-outline-secondary btn-sm" @click="saveAllDelete(this.saveList.userNo)">전체삭제</button>
                        <button class="btn btn-outline-primary btn-sm" @click="cartLink(this.saveList.pno)">장바구니 담기</button>
                    </div>
                </diV>
                <ul>
                    <li v-bind:key="idx" v-for="(list, idx) in saveList">
                        <div class="con">
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
                                <button @click="saveDelete(list.prdt_no)"><font-awesome-icon icon="fa-solid fa-xmark" size="sm" style="color:#999;"/></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </template>
    
    <style scoped>
    .title{font-weight:700;}
    .point{display:inline-block; font-size:18px; font-weight:700;}
    .color{color:#0d6efd; font-weight:700;}
    i.point{font-style:normal; font-size:16px;}
    .save_list{border-top:1px solid #111;}
    .save_all{padding:0.5rem 0.5rem; border-bottom:1px solid #ddd;}
    .save_all:after{content:''; display:block; clear:both;}
    .save_all .btn_box{float:right; margin-top:3px; margin-right:0;}
    .save_all .btn_box button:last-child{margin-right:0;}
    .all_box{float:left; padding:5px 0;}
    .save_list ul{margin-top:40px; padding-left:0; list-style:none;}
    .save_list li{float:left; width:49%; margin-bottom:25px;}
    .save_list li .con{border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
    .save_list li:nth-child(even){float:right;}
    .save_list ul:after{content:''; display:block; clear:both;}
    .book_info{position:relative;}
    .book_info > *{display:inline-block; vertical-align:middle;}
    .book_info .img{background:#ddd;}
    .book_info .txt{margin-left:20px;}
    .book_info .txt p{margin-bottom:5px; font-size:15px; font-weight:700;}
    .book_info .txt span{display:block; font-size:14px;}
    .book_info .check_box{vertical-align:top;}
    .book_info button{position:absolute; right:15px; top:15px; border:0; background:0;}
    .s_point{display:inline-block; margin-top:10px; font-style:normal; font-size:15px; font-weight:700;}
    </style>
    
    <script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                saveList : [],
                selected: []
            }
        },
        created(){
            this.getSaveList();
        },
        computed : {
            selectAll : { 
                //getter
                get: function(){
                    if((this.selected.length != this.saveList.length) || this.saveList.length == 0)
                        return false;
                    else
                        return true;							
                },
                //setter
                set: function(e){
                    console.log('e', e)
                    if(e){                    
                        for(let i = 0; i < this.saveList.length; i++){
                            this.selected.push(this.saveList[i].prdt_no);
                        }
                    }
                    else{
                        this.selected = [];
                    }        
                }
            }
        },
        methods : {
            async getSaveList(){
                let userNo = this.$store.state.userNo;  
                console.log('회원번호', userNo);
                let result = await axios.get('/api/save/' + userNo) 
                                        .catch(err => console.log(err)); // catch -> 오류가 나지 않으면 실행이 안되고 
                let list = result.data;
                console.log(list);
                this.saveList = list;
                console.log('데이터', this.saveList);
            },
            async saveDelete(pno){
                // 서버에 해당 데이터를 삭제
                axios
                .delete(`/api/save/${pno}`) 
                .then(result => {
                    if(result.data.affectedRows != 0 && result.data.changedRows == 0) {
                        alert(`정상적으로 삭제되었습니다.`);
                        this.$router.push({ path : '/mypage/save'});
                        this.getSaveList();
                    }else {
                        alert(`삭제되지 않았습니다.`);
                    }
                })
                console.log('pno', pno);
            },
            async saveAllDelete(){
                let userNo = this.$store.state.userNo;  
                // 서버에 해당 데이터를 삭제
                axios
                .delete(`/api/save/user/` + userNo) 
                .then(result => {
                    if(result.data.affectedRows != 0 && result.data.changedRows == 0) {
                        alert(`정상적으로 삭제되었습니다.`);
                        this.$router.push({ path : '/mypage/save'});
                        this.getSaveList();
                    }else {
                        alert(`삭제되지 않았습니다.`);
                    }
                })
                console.log('uno', userNo);
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
            async cartLink(){
                let uno = this.$store.state.userNo;
                let pno = this.saveList.prdt_no;
                // 장바구니 중복체크
                await axios.get("/api/cart/cartCheck?uno=" + uno + "&pno=" + pno)
                    .then(result => {
                    console.log("=======", result.data);
                    if (result.data) {
                        this.cartInsert();// 장바구니에 추가
                    } else {
                        alert("이미 담긴 도서입니다")
                    }
                })
                .catch(err => console.log(err));
            },
            async cartInsert() {
                let data = {
                    param: {
                        quantity: 1,
                        user_no: this.$store.state.userNo,
                        prdt_no: this.saveList.prdt_no
                    }
                }
                let result = await axios.post("/api/cart", data)
                    .catch(err => console.log(err));
                let info = result.data.insertId;
                if (info > 0) {
                    alert("장바구니에 추가되었습니다")
                    this.$router.push({ path: '/cart' }); // 클릭이벤트 추가. query 지움
                }
            }
        }
    }
    </script>