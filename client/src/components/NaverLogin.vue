<template>
    <div>
        <div id="naverIdLogin"></div>
        <!-- <button type="button" v-on:click="logout">로그아웃</button> -->
    </div>

</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            naverLogin: null,
                userInfo: {
                    user_no : null,
                    id : "",
                    pw_no : "",
                    name : "",
                    age_code : "",
                    gender : null,
                    join_date : null,
                    phone : "",
                    mail : "",
                    birth_date : "",
                    addr : "",
                    detail_addr : "",
                    login_type_code: 'j2',
                    
        
       }
            
           
        };
    },
   
    mounted(){
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "PGCgN8zYBUdI154CV8eJ", 
            callbackUrl: "http://localhost:8081/login",
            isPopup: false,
            loginButton: {
                color: "green", type: 2, height: 45
            },
           
        });
        //설정 정보를 초기화 하고 연동을 준비
        this.naverLogin.init();

        this.naverLogin.getLoginStatus((status)=>{
            if(status){
                console.log(status);
                console.log(this.naverLogin.user);
                

                //필수적으로 받아야하는 프로필 정보가 있다면 callback으로 처리 시점에 체크
                var email = this.naverLogin.user.getEmail();
              
                if(email == undefined || email == null){
                    alert("이메일은 필수 정보입니다. 정보제공을 동의해 주세요.");
                    
                    //사용자 재동의 위해 동의페이지로 감.
                    this.naverLogin.reprompt();
                    console.log(this.naverLogin.user);
                    return;
                    
                } else {
                    //회원가입 여부 확인
                    // if(email == undefined){
                    //     location.href = "/userJoin"
                    // }else{
                    //     location.href = "/main"
                    // }

                    //없으면 테이블에 insert

                    this.$store.commit('setIsLogin', true);
                    this.$store.commit('setId', email);
                    this.$store.commit('setUserNo', email);
                    this.$store.commit('setLoginTypeCode', 'j2');
                   
                    this.$router.push({path : '/main'});
                    
                }
                console.log()
            }else{
                console.log("callback 처리에 실패하였습니다.");
            }
            
        });
        
        
    },
    methods: {
    logout() {
      const accessToken = this.naverLogin.accessToken.accessToken; //eslint-disable-line no-unused-vars
      const url = `/oauth2.0/token?grant_type=delete&client_id=PGCgN8zYBUdI154CV8eJ&client_secret=cphD3Ktu8q&access_token=${accessToken}&service_provider=NAVER`;
 
      axios.get(url).then((res) => {   
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        localStorage.removeItem('com.naver.nid.access_token');
        
        this.$router.push({path : '/main'});
        console.log(res.data);
      });
 
      
    }

  }
};
    




</script>