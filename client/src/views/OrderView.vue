<template>
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
                  <p>{{ userInfo.name }}</p>
                  <p>{{ userInfo.name }} / {{ userInfo.phone }}</p>
                  <p>{{ userInfo.addr }}</p>
                </div>
              </td>
            </tr>
            <tr class="last_tr">
              <th>공동현관 출입방법</th>
              <td>
                <b-form-group>
                  <b-form-radio v-model="selected" name="some-radios" value="A" class="radio" checked>공동현관 비밀번호</b-form-radio>
                  <b-form-radio v-model="selected" name="some-radios" value="B" class="radio">자율출입 가능</b-form-radio>
                </b-form-group>
              </td>
            </tr>
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
              <tr class="border_bottom">
                <th>주문상품</th>
                <td>총 <span class="point">1</span>개</td>
              </tr>
            </tbody>
          </table>

          <table class="table">
            <colgroup>
              <col span="1" style="width:20%;">
              <col span="1" >
              <col span="2" style="width:15%;">
          </colgroup>
            <tbody>
              <tr>
                <td><img src="" alt="">{{ bookInfo.book_img }}</td>
                <td>{{ bookInfo.book_name }}</td>
                <td>1개</td>
                <td>{{ bookInfo.book_price }}</td>
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
                  <span>선택한 결제수단 : {{ selectedPay }}</span>
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
            <span><i class="point" v-bind="orderInfo.total_orders_amount">{{ totalBookPrice }}</i>원</span>
          </li>
          <li>
            <p>배송비</p>
            <span v-bind="orderInfo.dlv_amount">0원</span>
          </li>
          <li>
            <p>상품할인</p>
            <span><i class="color" v-bind="orderInfo.dc_amount">- {{ totalDcPrice }}</i>원</span>
          </li>
        </ul>
        <div class="total">
          <p>최종 결제 금액</p>
          <span><i v-bind="orderInfo.total_orders_amount">{{ totalPrice }}</i>원</span>
        </div>
        <button class="btn btn-primary btn_order" @click="getImPort()">결제하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.table{margin-bottom:0;}
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
.active{background:#eee !important;}
.pay_list label span{display:block; width:120px; height:50px; line-height:50px; font-weight:700; text-align:center; border:1px solid #ddd; background:#fff; border-radius:5px; cursor:pointer;}
.option_box{padding:20px; background:#eee; border-radius:10px; box-sizing:border-box;}
.addr_info p{margin-bottom:10px;}
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        userInfo: {
          name : '',
          addr : '',
          phone : ''
        },
        bookInfo : {
          book_img : '',
          book_name : '',
          book_price : ''
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
          total_orders_amount : 0,
          dc_amount : 0,
          total_pay_amount : 0,
          phone : this.phone,
          dlv_amount : 0,
          orders_no : this.orders_no,
          user_no : this.usr_no,
          pay_type : null,
          pay_result : null
        }
      }
    },
    computed : {
      totalBookPrice() {
        let result = 0;
        result += this.bookInfo.book_price;
        return result;
      },
      totalDcPrice() {
        let total = this.totalBookPrice;
        let result =  total * (this.userRankInfo.dc_rate / 100);
        return result;
      },
      totalPrice() {
        let total = this.totalBookPrice;
        let dc = total * (this.userRankInfo.dc_rate / 100);
        let result =  (total - dc);
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
        this.getUserInfo();
        this.getBookInfo();
        this.getUserRankInfo();
        this.orderInfo.orders_date = this.getToday();
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
      async getBookInfo(){
          let result = await axios.get('/api/books/BK240228001') // + no
          .catch(err => console.log(err));
          console.log(result);
          this.bookInfo = result.data;
      },
      async getUserRankInfo(){
          let result = await axios.get('/api/userranks/1') // + no
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
      // getImPort() {
      //   let IMP = window.IMP; // 생략가능

      //   IMP.init('imp64012553'); // 본인 가맹점 식별코드 삽입
      //   IMP.request_pay({
      //     pg: "nice_v2.nictest00m", // 나이스 신버전.상점아이디
      //     // pg: "kakaopay.TC0ONETIME", // 카카오페이.상점아이디
      //     // pg: "html5_inicis.INIpayTest", // KG이니시스.상점아이디
      //     pay_method: "card",
      //     merchant_uid : 'merchant_'+new Date().getTime(), // 도서 id
      //     name : '결제테스트',
      //     amount : this.totalPrice,
      //     buyer_email : this.userInfo.mail,
      //     buyer_name : this.userInfo.name,
      //     buyer_tel : this.userInfo.phone,
      //     buyer_addr : this.userInfo.addr,
      //     buyer_postcode : '123-456',
      //     m_redirect_url : 'http://localhost:8081/complete',
      //   },
      //   function (rsp) { // callback 
      //       console.log(rsp);
      //       console.log(rsp.imp_uid); // 
          
      //     if (rsp.imp_uid != '') {
      //       console.log('결제성공');
      //       //DB로 저장될 정보 전송
      //       // axios로 HTTP 요청

      //       axios({
      //         url: "api/complete",
      //         method: "post",
      //         headers: { "Content-Type": "application/json" },
      //         data: {
      //           imp_uid: rsp.imp_uid
      //         }
      //       }).then((data) => {
      //         // 서버 결제 API 성공시 로직
      //         console.log(data.data);
      //         if(data.data != 'failed') {
      //           let msg = '결제가 완료되었습니다.';
      //           alert(msg);
      //         }
      //         else {
      //           let msg = '결제가 취소되었습니다.';
      //           alert(msg);
      //         }
      //       })
      //       console.log(rsp);
      //     } else {
      //       console.log(rsp);
      //       let msg = '결제에 실패하였습니다.';
      //       alert(msg);
      //     }
      //   });
      // },

      // insertInfo() {
      //   // 2) ajax
      //   // 2-1) 실제 보낼 데이터 선별
      //   let data = this.getSendData();

      //   // 2-2) axios를 이용해서 ajax 실행 // 비동기로 진행
      //   // /api/users
      //   axios
      //   .post('/api/orders', data) // data는 반드시 배열 아니면 객체여야 함 -> axios는 default가 JSON으로 되어있음
      //   .then(rsp => {
      //       // 3) 결과처리
      //       console.log(rsp);
      //       let orders_no = rsp.data.insertId; // insertId는 AUTO_INCREMENT가 사용됐다는 가정하에 쓰임
      //       if(orders_no == 0) {
      //           alert(`등록되지 않았습니다\n 메세지를 확인해주세요\n${rsp.data.message}`);
      //       }else {
      //           alert(`정상적으로 등록되었습니다.`);
      //           this.orderInfo.orders_no = orders_no;
      //           this.$router.push({ path : '/'});
      //       }
      //   })
      //   .catch(err => console.log(err));
      // },
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
                    axios.post('/api/orders', {
                      param: {
                        recipient : result.data.buyer_name,
                        dlv_addr : result.data.buyer_addr,
                        orders_date : '2024-03-05',
                        orders_state : 's1',
                        total_orders_amount : this.orderInfo.total_orders_amount,
                        dc_amount : this.orderInfo.dc_amount,
                        total_pay_amount : result.data.amount,
                        phone : result.data.buyer_tel,
                        dlv_amount : 3000,
                        orders_no : 32,
                        user_no : 2,
                        pay_type : this.selectedPayCode,
                        pay_result : result.data.status
                      },
                    })
                    let msg = '결제가 완료되었습니다.';
                    alert(msg);
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
      }
    }
  }
</script>