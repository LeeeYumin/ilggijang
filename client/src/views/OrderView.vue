<template>
  <div v-if="popupView === true" class="popup">
    <div class="con">
      <div class="title">
        <h2>배송지 변경</h2>
        <button @click="popupView = false" class="btn_close"><font-awesome-icon icon="fa-solid fa-x" size="xl" /></button>
      </div>
      <div class="row">
          <div class="col-md-12 col-lg-6 my-3">
              <div class="form-item w-100">
                  <label class="bold">기본주소<sup>*</sup></label>
                  <input type="text" class="form-control" placeholder="우편번호" id="postcode" v-model="userInfo.postcode" readonly>
              </div>
          </div>
          <div class="col-md-12 col-lg-6">
              <div class="form-item w-100"><br><br>
                <div>
                    <OpenPostcode @postcode="getCode" />
                </div>
                <!-- <button type="button" class="btn border-secondary px-4 text-primary" @click="openPostcode()">우편번호 검색</button> -->
              </div>
          </div>
      </div>
      <div class="form-item">
          <input type="text" class="form-control" placeholder="도로명주소" id="addr" v-model="userInfo.addr" readonly>
          <input type="text" class="form-control my-3" placeholder="상세주소" id="detail_addr" v-model="userInfo.detail_addr">
      </div>
      <div class="btn_save">
       <button class="btn btn-primary" @click="popupView = false">저장</button>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <h3 class="mb-4 title">주문/결제</h3>
    <div class="content">
      <div class="left">
        <div class="gray_box">
          <table class="table">
          <colgroup>
            <col span="1" style="width:25%;">
            <col span="1" style="width:75%;">
          </colgroup>
          <tbody>
            <tr>
              <th>배송지 정보</th>
                <td>
                  <div class="addr_info">
                    <p><i class="point color va_m"><font-awesome-icon icon="fa-solid fa-location-dot" size="sm" style="color : #0d6efd; "/> {{ userInfo.name }}</i> <button class="btn btn-outline-secondary btn-sm" @click="popupView = true">변경</button></p>
                    <p>{{ userInfo.name }} / {{ userInfo.phone }}</p>
                    <p>[{{ userInfo.postcode }}] {{ userInfo.addr }} {{ userInfo.detail_addr }}</p>
                </div>
              </td>
            </tr>
            <!-- <tr class="last_tr">
              <th>공동현관 출입방법</th>
              <td>
                <b-form-group>
                  <b-form-radio v-model="selected" name="some-radios" value="A" class="radio" checked>공동현관 비밀번호</b-form-radio>
                  <b-form-radio v-model="selected" name="some-radios" value="B" class="radio">자율출입 가능</b-form-radio>
                </b-form-group>
              </td>
            </tr> -->
          </tbody>
        </table>
        </div>
        <div class="gray_box mt-4">
          <table class="table">
            <colgroup>
              <col span="1" style="width:25%;">
              <col span="1" style="width:75%;">
          </colgroup>
            <tbody>
              <tr class="border_bottom pb-20">
                <th>주문상품</th>
                <td>총 <span class="point color">{{ selectList.length }}</span>개</td>
              </tr>
            </tbody>
          </table>

          <table class="table tbl_st">
            <colgroup>
              <col span="1" style="width:13%;">
              <col span="1" >
              <col span="2" style="width:15%;">
          </colgroup>
            <tbody>
              <tr v-bind:key="idx" v-for="(info, idx) in selectList">
                <td>
                  <span class="img" @click="goDetailBook(list.prdt_no)">
                      <img :src="getImgUrl(info.book_img)" alt="cover">
                  </span>
                </td>
                <td>{{ info.book_name }}</td>
                <td>{{ info.quantity }}개</td>
                <td><i class="point">{{ formatPrice(info.book_price * info.quantity) }}</i>원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="gray_box mt-4">
          <table class="table">
            <tbody>
              <tr>
                <th>할인등급</th>
                <td>고객님은 <i class="point color">'{{ userRankInfo.user_rank }}'</i> 회원입니다. <i class="point color">'{{ userRankInfo.dc_rate }}%'</i> 할인이 적용됩니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="gray_box mt-4">
          <table class="table">
            <thead>
              <tr class="border_bottom">
                <th>결제수단</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="pay_list">
                    <label class="pay">
                      <input type="radio" v-bind:value="radioValue1" v-model="selectPay" name="payMethod" @change="payMethod" @click="payCnt++" />
                      <span v-bind:class="{'active' : isActive}">카드결제</span>
                    </label>
                    <label class="pay">
                      <input type="radio" v-bind:value="radioValue2" v-model="selectPay" name="payMethod" @change="payMethod" @click="payCnt++" />
                      <span v-bind:class="{'active' : isActive}">카카오페이</span>
                    </label>
                    <label class="pay">
                      <input type="radio" v-bind:value="radioValue3" v-model="selectPay" name="payMethod" @change="payMethod" @click="payCnt++" />
                      <span v-bind:class="{'active' : isActive}">토스페이</span>
                    </label>
                  </div>
                  <span class="pick"><i>선택한 결제수단</i> {{ selectedPay }}</span>
                  <div v-if="show" class="option_box">
                    <b-form-select v-model="selected" :options="options"></b-form-select>
                  </div>
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
            <span><i class="point" v-bind="orderInfo.total_orders_amount">{{ formatPrice(totalBookPrice) }}</i>원</span>
          </li>
          <li>
            <p>배송비</p>
            <span v-bind="orderInfo.dlv_amount">{{ formatPrice(dlvAmount) }}원</span>
          </li>
          <li>
            <p>상품할인</p>
            <span><i class="color" v-bind="orderInfo.dc_amount">- {{ formatPrice(totalDcPrice) }}</i>원</span>
          </li>
        </ul>
        <div class="total">
          <p>최종 결제 금액</p>
          <span><i v-bind="orderInfo.total_pay_amount">{{ formatPrice(totalPrice) }}</i>원</span>
        </div>
        <button class="btn btn-primary btn_order" @click="getImPort()">결제하기</button>
        <!-- test -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{position:relative;}
.title{font-weight:700;}
.content{position:relative; margin-bottom:50px;}
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
.table{margin-bottom:0; text-align:left;}
.table tr:last-child th,
.table tr:last-child td{border-bottom:0;}
.container{padding:0;}
.gray_box{padding:20px; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
.info p{margin:5px 0;}
fieldset{margin-bottom:0 !important;}
.radio{display:inline-block; margin-right:10px; margin-bottom:0; vertical-align:middle;}
.point{display:inline-block; font-size:18px; font-weight:700;}
.color{color:#0d6efd; font-weight:700;}
i.point{font-style:normal; font-size:16px;}
.border_bottom{border-bottom:1px solid #ddd;}
.pay_list{margin-top:5px;}
.pay_list label{display:inline-block; position:relative; margin-right:10px;}
.pay_list input[type="radio"]{display:block; position:absolute; z-index:-1;}
.pay_list span:hover{background:#eee;}
.pay_list label span{display:block; width:120px; height:50px; line-height:50px; font-weight:700; text-align:center; border:1px solid #ddd; background:#fff; border-radius:5px; cursor:pointer;}
.option_box{padding:20px; background:#eee; border-radius:10px; box-sizing:border-box;}
.addr_info p{margin-bottom:10px;}
.pb-20 td{padding-bottom:20px;}
.tbl_st tbody tr td{padding:20px 0; vertical-align:middle;}
.va_m{vertical-align:middle;}
.popup{position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0, 0, 0, 0.5); z-index:100;}
.popup .con{position:absolute; left:50%; top:50%; width:500px; height:380px; padding:30px 20px; background:#fff; border-radius:15px; z-index:100; transform:translate(-50%, -50%); box-sizing:border-box; box-shadow:0 0 3px 2px rgba(0, 0, 0, 0.1);}
.popup .con h2{font-size:25px; font-weight:700;}
.popup .bold{margin-bottom:5px; font-weight:700;}
.popup .btn_close{background:none; border:0;}
.popup .title{display:flex; justify-content:space-between; align-items:center;}
.popup .btn_save{margin:30px auto 0; text-align:center;}
.popup .btn_save button{padding:10px 30px;}
.hidden{display:none; font-size:0;}
.img{display:block; width:80px; text-align:center; margin:0 auto; box-shadow:0 0 5px 2px rgba(0, 0, 0, 0.1);}
.img img{display:block; width:100%; height:100%;}
.pick{display:block; margin-top:10px; letter-spacing:-1px;}
.pick i{display:inline-block; margin-right:10px; background:#ddd; padding:5px 10px; border-radius:50px; font-size:13px; font-style:normal; font-weight:700;}
</style>

<script>
  import OpenPostcode from '../components/OpenPostcode.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        popupView : false,
        userInfo: {
          name : '',
          addr : '',
          phone : '',
          user_rank_no : ''
        },
        cartList : {
          book_name : '',
          book_img : '',
          title : '',
          book_price : '',
          quantity : ''
        },
        userRankInfo : {
          user_rank : '',
          dc_rate : ''
        },
        isActive : true,
        selectPay: '',
        selectedPay : '',
        selectedPayCode : '',
        radioValue1: 'credit',
        radioValue2: 'kakao',
        radioValue3: 'toss',
        orderInfo: {
          recipient : this.name,
          dlv_addr : this.addr,
          orders_date : this.date,
          orders_state : 's1',
          total_orders_amount : this.total_orders_amount,
          dc_amount : this.dc_amount,
          total_pay_amount : 0,
          phone : this.phone,
          dlv_amount : this.dlv_amount,
          orders_no : this.orders_no,
          user_no : this.usr_no,
          pay_type : null,
          pay_result : null
        },
        selectList: JSON.parse(sessionStorage.getItem("selectItem")), // localStorage -> sessionStorage
      }
    },
    computed : {
      count() {
          return this.cartList.length;
      },
      totalBookPrice() {
          let result = 0;
          for(let i = 0; i < this.selectList.length; i++){
            result += (this.selectList[i].book_price * this.selectList[i].quantity);
          }
          return result;
      },
      dlvAmount() {
          let result = 0;
          for(let i = 0; i < this.selectList.length; i++){
              if(this.totalBookPrice < 15000) {
                  result = 3000;
              }
          }
          return result;
      },
      totalDcPrice() {
        let total = this.totalBookPrice;
        let result =  total * (this.userRankInfo.dc_rate / 100);
        return result;
      },
      totalPrice() {
        let result = 0;
        result = (this.totalBookPrice + this.dlvAmount) - this.totalDcPrice;
        return result;
      }
    },
    created(){
        let orderId = this.$route.query.userId;
        this.getUserInfo(orderId);
        this.getCartList();
        this.getUserRankInfo();
        this.orderInfo.orders_date = this.getToday();
    },
    components : {
      OpenPostcode
    },
    methods : {
      async getUserInfo(){
        let userId = this.$store.state.id;
        console.log('회원번호', userId);
        let result = await axios.get('/api/user/' + userId) // + no
                      .catch(err => console.log(err));
        console.log(result);
        this.userInfo = result.data;
      },
      async getCartList(){
        let userNo = this.$store.state.userNo;
        let result = await axios.get('/api/cart/user/' + userNo) // + no
        .catch(err => console.log(err));
        console.log('결과', result);
        this.cartList = result.data;
      },
      async getUserRankInfo(){
        let userNo = this.$store.state.userNo;
        let result = await axios.get('/api/userranks/' + userNo) // + no
        .catch(err => console.log(err));
        console.log(result);
        this.userRankInfo = result.data;
      },
      goToPayment() {
        this.show = !this.show;
      },
      getToday() {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
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
      getSendData() {
        let obj = this.orderInfo;
        let delData = ["orders_no"];
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
      payMethod: function () {
        if (this.selectPay == 'credit') {
          this.selectPay = 'nice_v2.nictest00m';
          this.selectedPay = '카드 결제';
          this.selectedPayCode = 'p1';
        } else if (this.selectPay == 'kakao') {
          this.selectPay = 'kakaopay.TC0ONETIME';
          this.selectedPay = '카카오페이 결제';
          this.selectedPayCode = 'p2';
        } else {
          this.selectPay = 'tosspay.tosstest';
          this.selectedPay = '토스페이 결제';
          this.selectedPayCode = 'p3';
        }
        console.log('function', this.selectPay);
      },
      async getImPort() {
        // 결제 완료시 아임포트 API 및 DB 연결
        let IMP = window.IMP; // 생략가능
        IMP.init('imp64012553'); // 본인 가맹점 식별코드 삽입
        
        if (this.payCnt != 0) {
          IMP.request_pay(
            {
              pg: this.selectPay,
              // pg: "nice_v2.nictest00m", // 나이스 신버전.상점아이디
              // pg: "kakaopay.TC0ONETIME", // 카카오페이.상점아이디
              // pg: "html5_inicis.INIpayTest", // KG이니시스.상점아이디
              pay_method: "card",
              merchant_uid : 'merchant_'+new Date().getTime(), // 도서 id
              name : '결제테스트',
              amount : this.totalPrice,
              buyer_email : this.userInfo.mail,
              buyer_name : this.userInfo.name,
              buyer_tel : this.userInfo.phone,
              buyer_addr : this.userInfo.addr,
              buyer_postcode : '123-456'
            },
            (rsp) => {
              // callback
              if (rsp.imp_uid != '') {
                console.log('결제성공');
                axios({
                  url: "api/complete",
                  method: "post",
                  headers: { "Content-Type": "application/json" },
                  data: {
                    imp_uid: rsp.imp_uid
                  }
                }).then((result) => {
                  // 서버 결제 API 성공시 로직
                  console.log(result.data);
                  if(result.data.status != 'failed') {
                    //DB로 저장될 정보 전송
                    // axios로 HTTP 요청
                    // 주문 insert, 주문상세 insert, 카트삭제 delete, transaction
                    // let orderDetaildata = this.changData();
                    
                    axios.post('/api/afterpay', {
                      data : {
                        orderInfo: {
                          recipient : result.data.buyer_name,
                          dlv_addr : result.data.buyer_addr,
                          orders_date : this.orderInfo.orders_date, // 결제승인시간 확인필요
                          orders_state : 's1',
                          total_orders_amount : this.totalBookPrice,
                          dc_amount : this.totalDcPrice,
                          total_pay_amount : result.data.amount,
                          phone : result.data.buyer_tel,
                          dlv_amount : this.dlvAmount,
                          user_no : this.$store.state.userNo,
                          pay_type : this.selectedPayCode,
                          pay_result : result.data.status
                        },
                        orderDetailInfo : {
                          orders_amount : this.totalBookPrice,
                          selectList : this.selectList // 주문상세정보 중 수량, 단가, 상품번호
                        },
                        cartInfo : {
                          user_no : this.$store.state.userNo
                        }

                      }
                    })

                    let msg = '결제가 완료되었습니다.';
                    alert(msg);
                    this.$router.push({ path: '/complete' });
                  }
                  else {
                    let msg = '결제가 취소되었습니다.';
                    alert(msg);
                  }
                })
                console.log(rsp);
            } else {
              console.log(rsp);
              let msg = '결제에 실패하였습니다.';
              alert(msg);
            }
          });
        }
      },
      openPostcode() {
        new window.daum.Postcode({
            oncomplete : (data) => {
                this.userInfo.postcode = data.zonecode;
                this.userInfo.addr = data.roadAddress;
            }
        }).open();
      },
      getCode(zonecode, roadAddress) {
          this.userInfo.postcode = zonecode;
          this.userInfo.addr = roadAddress;
      },
      closePop() {
        this.$emit('close');
      },
      getImgUrl(imgName) { // 이미지 동적으로 가져오기
        // return new URL(`/product/${imgName}`, 'http://localhost:8081');
        return new URL(`${this.url}/product/${imgName}`);
      }
    }
  }
</script>