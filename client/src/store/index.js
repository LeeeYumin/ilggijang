import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            id: {},
            pw_no: {}
        }
    },
    mutations : {
     id(state, data){
        state.id = data;
     },
     pw_no(state, data){
        state.pw_no = data;
     }
    }
});

export default store;