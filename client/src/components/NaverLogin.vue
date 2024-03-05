<template>
    <div>
        <div id="naverIdLogin"></div>
        <button type="button" @click="logout">로그아웃</button>
    </div>

</template>

<script>
import axios from "axios";

export default{
    data(){
        return{
            naverLogin: null,
           
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
                    //시용자 재동의 위해 동의페이지로 감.
                    this.naverLogin.reprompt();
                    return;
                    
                }
            }else{
                console.log("callback 처리에 실패하였습니다.");
            }
        });
    },
    methods: {
    logout() {
      const accessToken = this.naverLogin.accessToken.accessToken;
      const url = `/oauth2.0/token?grant_type=delete&client_id=PGCgN8zYBUdI154CV8eJ&client_secret=cphD3Ktu8q&access_token=${accessToken}&service_provider=NAVER`;
      console.log("logout");
      axios.get(url).then((res) => {        
        console.log(res.data);
      });
 
      //https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=WNRtIMhdk7k0zJMnMik0&client_secret=ugja7husCU&access_token=AAAAOOCeX4fAa_NxKPAmJW8C1UeLxGT3nM0wRV33irhyHyRua1JJrfrp0jZwfbOD0r502Id9mbhb0YiA9_NvCXGAwws&service_provider=NAVER
    },
  },
};
    




</script>