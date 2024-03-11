<template>
    <div class="container">
      <h3>회원가입</h3>
      <div class="join_box">
          <form action="#">
              <div class="row g-5 center">
                <div class="col-md-12 col-lg-6 col-xl-7">
                    <div class="row">
                        <div class="col-md-12 col-lg-6">
                            <div class="form-item w-100">
                                <label class="bold">아이디<sup>*</sup></label>
                                <input type="text" class="form-control" placeholder="아이디 입력" id="id" v-model="userInfo.id" autofocus>
                            </div>
                            <p class="form-label">- 5~20자, 영문 소문자(필수), 숫자만 사용 가능</p>
                        </div>
                        <div class="col-md-12 col-lg-6 my-3">
                            <div class="form-item w-100 my-3">
                                <button type="button" class="btn btn-outline-primary" @click="checkID()">중복확인</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-item col-lg-6">
                        <label class="bold">비밀번호<sup>*</sup></label>
                        <input type="password" class="form-control" placeholder="비밀번호 입력" id="pw_no" v-model="userInfo.pw_no">
                    </div>
                    <p class="form-label">- 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능</p>
                    <div class="form-item col-lg-6 my-3">
                        <label class="bold">비밀번호 확인<sup>*</sup></label>
                        <input type="password" class="form-control" placeholder="비밀번호 입력" id="pw_no_confirm" v-model="userInfo.pw_no_confirm">
                    </div>
                    <div class="form-item col-lg-6 my-3">
                        <label class="bold">이름<sup>*</sup></label>
                        <input type="text" class="form-control" placeholder="이름 입력" id="name" v-model="userInfo.name">
                    </div>
                    <div class="form-item col-lg-6 my-3">
                        <label class="bold">휴대전화<sup>*</sup></label>
                        <input type="text" class="form-control" placeholder="'-'없이 숫자만 입력" id="phone" v-model="userInfo.phone">
                    </div>
                    <div class="form-item col-lg-6 my-3">
                        <label class="bold">이메일<sup>*</sup></label>
                        <input type="text" class="form-control" placeholder="이메일 입력 (예시 : email@example.com)" id="email" v-model="userInfo.mail">
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-6">
                            <div class="form-item w-100">
                                <label class="bold">생년월일<sup></sup></label>
                                <input type="text" class="form-control" placeholder="생년월일 8자리 (예시 : 19000101)" id="birth_date" v-model="userInfo.birth_date">
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <div class="form-item w-100">
                                <label class="bold">성별<sup></sup></label><br>
                                  <input type="radio" class="btn-check" name="gender" id="btnradio1" autocomplete="off" value="a01" v-model="userInfo.gender"/>
                                  <label class="btn btn-outline-primary margin-right" for="btnradio1">남</label>
                                  <input type="radio" class="btn-check" name="gender" id="btnradio2" autocomplete="off" value="a02" v-model="userInfo.gender"/>
                                  <label class="btn btn-outline-primary" for="btnradio2">여</label>
                            </div>
                        </div>
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
                        <!-- <input type="text" class="form-control" placeholder="우편번호" id="postcode" v-model="userInfo.postcode" readonly>  -->
                        <input type="text" class="form-control" placeholder="도로명주소" id="addr" v-model="userInfo.addr" readonly>
                        <input type="text" class="form-control my-3" placeholder="상세주소" id="detail_addr" v-model="userInfo.detail_addr">
                    </div>
                    <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                        <button type="button" class="btn border-secondary py-3 px-4 w-100" @click="userInsert()">가입신청</button>
                    </div>
                </div>
  
                <!-- <table class="table table-hover">
              <thead>
                  <tr>
                      <th>No.</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일자</th>
                  </tr>
              </thead>
              <tbody>
                  <tr  :key="i" v-for="(board, i) in memberList" @click="goToDetail(board.no)">
                      <td>{{ board.member_id }}</td>
                  </tr>
              </tbody>
          </table> -->
            </div>
        </form>
    </div>
  </div>
  <!-- Checkout Page End -->
  </template>
  
  <script>
 
import OpenPostcode from '../components/OpenPostcode.vue';
import axios from 'axios';

  
  export default {
      name: 'userJoin',
      data() {
          return {
              userInfo : {
                
                  id : '',
                  pw_no : '',
                  pw_no_confirm : '',
                  name : '',
                  phone : '',
                  mail : '',
                  birth_date: null,
                  gender : '',
                  postcode : '',
                  type : '',
                  addr : '',
                  detail_addr : '',
                  quit_date : null,
                  token : '',
                  user_rank_no : 1
              },
              userList : [],
              check : false
          };
      },
      created() {
          this.getUserList();
      },
      components : {
          OpenPostcode
      },
      methods : {
          async userInsert() {
              if(!this.validation()) return;
  
              let data = {
                  param : {
                      user_no : this.userInfo.user_no,
                      id : this.userInfo.id,
                      pw_no : this.userInfo.pw_no,
                      name : this.userInfo.name,
                      phone : this.userInfo.phone,
                      mail : this.userInfo.mail,
                      birth_date: this.userInfo.birth_date,
                      gender_code : this.userInfo.gender_code,
                      postcode : this.userInfo.postcode,
                    //   member_type : this.userInfo.type,
                      addr : this.userInfo.addr,
                      detail_addr : this.userInfo.detail_addr,
                      token : this.userInfo.token,
                      user_rank_no : this.userInfo.user_rank_no
                  }
              };
              let result = await axios.post("/api/user", data)
                          .catch(err => console.log(err));
              let info = result.data.affectedRows;
              if(info > 0) {
                  alert('회원가입이 완료되었습니다.');
              }
              this.$router.push({path : '/main'})
          },
          validation() {
              if(this.userInfo.id == '') {
                  alert('아이디를 입력해주세요.');
                  return false;
              }
              if(this.userInfo.pw_no == '') {
                  alert('비밀번호를 입력해주세요.');
                  return false;
              }
              if(this.userInfo.pw_no_confirm == '') {
                  alert('비밀번호 확인을 입력해주세요.');
                  return false;
              }
              if(this.userInfo.name == '') {
                  alert('이름을 입력해주세요.');
                  return false;
              }
              if(this.userInfo.phone == '') {
                  alert('휴대전화를 입력해주세요.');
                  return false;
              }
              if(this.userInfo.mail == '') {
                  alert('이메일을 입력해주세요.');
                  return false;
              }
              if(this.userInfo.addr == '') {
                  alert('기본주소를 입력해주세요.');
                  return false;
              }
              if(this.userInfo.detail_addr == '') {
                  alert('상세주소를 입력해주세요.');
                  return false;
              }
              if(!(/^(?=.*[a-z])[a-z0-9]{5,20}$/g.test(this.userInfo.id))) {
                  alert('아이디는 5~20자, 영문 소문자(필수), 숫자만 사용 가능합니다.');
                  return false;
              }
              if(!(/^[a-zA-Z0-9~!@#$%^&*]{8,16}$/g.test(this.userInfo.pw_no))) {
                  alert('비밀번호는 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능합니다.');
                  return false;
              }
              if(!(this.userInfo.pw_no == this.userInfo.pw_no_confirm)) {
                  alert('비밀번호가 일치하지 않습니다.');
                  return false;
              }
              if(!this.check) {
                  alert('아이디 중복확인을 해주세요.');
                  return false;
              }
  
              return true;
          },
        //   openPostcode() {
        //       new window.daum.Postcode({
        //           oncomplete : (data) => {
        //               this.userInfo.postcode = data.zonecode;
        //               this.userInfo.addr = data.roadAddress;
        //           }
        //       }).open();
        //   },
          getCode(zonecode, roadAddress) {
              this.userInfo.postcode = zonecode;
              this.userInfo.addr = roadAddress;
          },
          async getUserList() {
              let result = await axios.get('/api/user')
                              .catch(err => console.log(err));
              this.userList = result.data;
          },
          checkID() {
              if(this.userInfo.id == '') {
                  alert('아이디를 입력해주세요.');
                  return false;
              } else {                
                  for(let list of this.userList) {
                      if(list.id == this.userInfo.id) {
                          alert('해당 아이디는 사용 중입니다.');
                          return false;
                      }
                  }
                  alert('사용 가능한 아이디입니다.');
                  this.check = true;
                  return true;
              }
          }
      }
  }
  </script>
  
  <style scoped>
  .container{padding-top:50px; margin-bottom:50px;}
  h3{font-weight:700;}
  .join_box{margin-top:30px;}
  .center {
      justify-content: center
  }
  
  sup {
      color: red
  }
  
  .bold {
      font-weight: 700;
      margin-bottom: .5rem;
  }
  
  .margin-right {
      margin-right: 0.5rem;
  }
  
  input::placeholder {
      color: #cccccc;
  }
  
  input:read-only {
      background-color: #eeeeee;
  }
  
  .page-header {
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
  }
  
  .breadcrumb-item+.breadcrumb-item::before {
      float: left;
      padding-right: .5rem;
      color: #fd7e14;
      content: var(--bs-breadcrumb-divider, "/")
          /* rtl: var(--bs-breadcrumb-divider, "/") */
  }
  </style>