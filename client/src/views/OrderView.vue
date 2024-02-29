<template>
  <div class="container">
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
              <div class="info">
                <p>{{ userInfo.name }}</p>
                <p>{{ userInfo.name }}/{{ userInfo.phone }}</p>
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
              <td><img src="" alt=""></td>
              <td>타이틀</td>
              <td>1개</td>
              <td>가격</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="gray_box mt-4">
        <table class="table">
          <tbody>
            <tr>
              <th>할인등급</th>
              <td>고객님은 <i class="point">'골드'</i>회원입니다. <i class="point">'2%'</i> 할인이 적용됩니다.</td>
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
                  <li><button>일반결제</button></li>
                  <li><button>Npay</button></li>
                </ul>
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
          <span><i class="point">17,000</i>원</span>
        </li>
        <li>
          <p>배송비</p>
          <span>0원</span>
        </li>
        <li>
          <p>상품할인</p>
          <span><i class="color">-1700</i>원</span>
        </li>
      </ul>
      <div class="total">
        <p>최종 결제 금액</p>
        <span><i>15,300</i>원</span>
      </div>
      <button class="btn btn-primary btn_order">결제하기</button>
    </div>
  </div>
</template>

<style scoped>
.container{position:relative;}
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
            }
      }
    },
    created(){
        let searchNo = this.$route.query.userNo;
        this.getBoardInfo(searchNo);
    },
    methods : {

        async getUserList(no){
            let result = await axios.get('/api/user/' + no)
                                   .catch(err => console.log(err));

            this.userList = result.data;
        }
    }
  }
</script>