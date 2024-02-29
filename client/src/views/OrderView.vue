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
                <div>
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
                  <ul>
                    <li><button @click="goToPayment">일반결제</button></li>
                    <li><button @click="goToNpay()">Npay</button></li>
                  </ul>
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
            <span><i class="point">{{ totalBookPrice }}</i>원</span>
          </li>
          <li>
            <p>배송비</p>
            <span>0원</span>
          </li>
          <li>
            <p>상품할인</p>
            <span><i class="color">- {{ totalDcPrice }}</i>원</span>
          </li>
        </ul>
        <div class="total">
          <p>최종 결제 금액</p>
          <span><i>{{ totalPrice }}</i>원</span>
        </div>
        <button class="btn btn-primary btn_order">결제하기</button>
      </div>
    </div> 
  </div>
</template>

<style scoped>
.title{font-weight:700;}
.content{position:relative;}
.left{width:calc(100% - 28%);}
.right{position:absolute; right:0; top:0; width:25%; padding:20px; border:1px solid #ddd; border-radius:15px; box-sizing:border-box;}
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
table ul{list-style:none; margin-top:20px; padding-left:0;}
table ul li{display:inline-block; margin-left:10px;}
table ul li:first-child{margin-left:0;}
table ul li button{width:120px; height:50px; font-weight:700; border:1px solid #ddd; background:#fff; border-radius:5px;}
table ul li button:hover{background:#eee;}
.option_box{padding:20px; background:#eee; border-radius:10px; box-sizing:border-box;}
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
        selected: null,
        options: [
          { value: null, text: '카드를 선택해주세요' },
          { value: 'a', text: '신한카드' },
          { value: 'b', text: 'KB국민카드' },
          { value: 'd', text: 'BC카드'}
        ],
        show: false,
      }
    },
    computed : {
       totalBookPrice() {
        let result = 0;
        result = + this.bookInfo.book_price;
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
    },
    methods : {
        async getUserInfo(){
            let result = await axios.get('/api/user/50') // + no
                                   .catch(err => console.log(err));

            console.log(result);
            this.userInfo = result.data;
        },
        async getBookInfo(){
            let result = await axios.get('/api/books/BK000001') // + no
                                   .catch(err => console.log(err));

            console.log(result);
            this.bookInfo = result.data[0];
        },
        async getUserRankInfo(){
            let result = await axios.get('/api/userranks/2') // + no
                                   .catch(err => console.log(err));

            console.log(result);
            this.userRankInfo = result.data;
        },
        goToPayment() {
          this.show = !this.show;
        }
    }
  }
</script>