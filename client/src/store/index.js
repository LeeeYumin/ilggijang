import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state () {
        return {
            id: {},
            isLogin: {},
            userNo: {}
            
        }
    },
    mutations : {
        setId(state, data){
           state.id = data;
        },
        setIsLogin(state, data){
           state.isLogin = data;
        },
        setUserNo(state, data){
           state.userNo = data;
        }
   
   
   
   

    },
    plugins : [
        persistedstate()
    ]
});

export default store;