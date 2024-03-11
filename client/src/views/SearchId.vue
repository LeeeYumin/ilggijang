<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
    <h1 class="text-center text-white display-6">아이디 찾기</h1>
    <ol class="breadcrumb justify-content-center mb-0">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item text-white">Search ID</li>
    </ol>
  </div>
  <!-- Single Page Header End -->
    
    <!-- Content -->
      <div  v-show="!member" class="container-xxl boxsize">
        <div class="container-p-y">
          <div class="authentication-inner">
            <!-- Register -->
            <div class="card">
              <div class="card-body">
  
                <!-- <h4 class="mb-2 center">LOGIN</h4>
                <p class="mb-4">Please sign-in to your account and start the adventure</p> -->
  
                <!-- <form id="formAuthentication" class="mb-3" action="index.html" method="POST"> -->
                  <div class="mb-3">
                    <label for="name" class="form-label">이름</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      placeholder="이름 입력"
                      autofocus
                      v-model="name"
                    />
                  </div>
                  <div class="mb-3 form-password-toggle">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="phone">휴대전화</label>
                      <!-- <a href="auth-forgot-password-basic.html">
                        <small>Forgot Password?</small>
                      </a> -->
                    </div>
                    <div class="input-group input-group-merge">
                      <input
                        type="password"
                        id="phone"
                        class="form-control"
                        name="phone"
                        placeholder="'-'없이 숫자만 입력"
                        aria-describedby="password"
                        v-model="phone"
                        @keyup.enter="userLogin()"
                      />
                      <!-- <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span> -->
                    </div>
                  </div>
                  <!-- <div class="mb-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="remember-me" />
                      <label class="form-check-label" for="remember-me"> Remember Me </label>
                    </div>
                  </div> -->
                  <div class="mb-3">
                    <button class="btn btn-primary2 d-grid login center" type="button" @click="userLogin()">다음</button>
                  </div>
                <!-- </form> -->
              </div>
            </div>
            <!-- /Register -->
          </div>
        </div>
      </div>
    <!-- / Content -->
    <div v-show="user">고객님의 정보와 일치하는 아이디는 {{ this.id }}입니다.</div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
          name : '',
          phone : '',
          id : '',
          user : false
      }
    },
    created() {
        //   console.log(this.$store.state.isLogin);
        //   console.log(this.$store.state.userInfo);
        console.log('보이나3', data)
      },
    methods : {
      async userLogin() {
        // if(!this.validation()) return;
  
        let data = {
          name : this.name,
          phone : this.phone
        };
        console.log('보이나1', data)
        let result = await axios.post('api/user/searchId', data)
                      .catch(err => console.log(err));      
                      console.log('보이나2', data)
        if(result.data.userInfo == '1') {
          alert('아이디 있음!')
          // this.$store.commit('setMemberInfo', result.data.member);
          this.id = result.data.user.id;
          this.user = true;
  
        } else {
          alert('아이디 없음!')
          this.name = '';
          this.phone = '';
        }
  
        // if(data.member_name == this.name && data.member_phone == this.phone) {
        //   alert('로그인 되었습니다.');
  
          // this.$store.commit('setLoginStatus', true);
          // this.$store.commit('setMemberInfo', data);
          // console.log(this.$store.state.memberStore.loginStatus);
          // console.log(this.$store.state.memberStore.memberInfo);
          // this.$router.push({path : '/'})
        // } else {
        //   alert('이름 또는 휴대전화가 일치하지 않습니다.')
        // }
      },
      validation() {
        if(this.name == '') {
          alert('이름을 입력해주세요.');
          return false;
        }
        if(this.phone == '') {
          alert('휴대전화를 입력해주세요.');
          return false;
        }
  
        return true;
      }
    }
  }
  </script>
 