<template>
    <div>
        <div id="naverIdLogin"></div>
        <button type="button" @click="logout">로그아웃</button>
    </div>

</template>

<script>
// import axios from "axios";

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
                color: "green", type: 3, height: 45
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
    }
}

</script>