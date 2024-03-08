<template>
    <div class="container">
        <div class="popup">
            <div class="con">
                <div class="title">
                    <h2>리뷰 수정</h2>
                    <button @click="$emit('close')" class="btn_close"><font-awesome-icon icon="fa-solid fa-x"
                            size="xl" /></button>
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-6 my-3">
                        <div class="grade" @click.capture="grade = $event.target.value">
                            <button value="1" class="star">★</button>
                            <button value="2" class="star">★</button>
                            <button value="3" class="star">★</button>
                            <button value="4" class="star">★</button>
                            <button value="5" class="star">★</button>
                            <input type="text" v-model="grade" readonly />
                            <div>
                                <button>첨부파일?</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <textarea cols="30" rows="10" class="form-control" placeholder="내용을 입력하세요" id="addr"
                        v-model="content"></textarea>
                </div>
                <div class="btn_save">
                    <button class="btn btn-primary" @click="updateReview()">확인</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 데이터 확인용 -->
    <tr>
        <input type="text" v-model="orders_detail_no" readonly />
    </tr>
    <tr>
        <input type="text" v-model="prdt_no" readonly />
    </tr>
</template>

<script>
import axios from 'axios';

export default {
    emits: ['close'],
    props:{
        review_no: {type : String, default : ''}
    },
    data() {
        return {
            boardid: 'reviews',
            jsons: {
                user_no: 2, //this.$store.state.userNo,
                write_date: null,
                orders_detail_no: 100,
                grade: 0,
                prdt_no: 'BK240228001',
                content: ""
            }
        }
    },
    watch: {
        // write_date: function (a, b) {
        //     console.log(a, b);
        // },
        // grade: function (a, b) {
        //     console.log(a, b);
        // }
    },
    beforeUnmount() {
        console.log(this.write_date);
    },
    methods: {
        async updateReview() {
            if(this.grade == 0){
                return alert('평점을 매겨주세요');
            } else if(this.content == ''){
                return alert('내용을 입력해주세요');
            }
            this.write_date = new Date();
            let result = await axios.put(`/api/${this.boardid}${this.review_no}`, this.jsons)
                .catch(err => console.log(err));
            console.log(result.data);

            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.popup .con {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 700px;
    height: 800px;
    padding: 30px 20px;
    background: #fff;
    border-radius: 15px;
    z-index: 100;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
}

.popup .con h2 {
    font-size: 25px;
    font-weight: 700;
}

.popup .bold {
    margin-bottom: 5px;
    font-weight: 700;
}

.popup .btn_close {
    background: none;
    border: 0;
}

.popup .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup .btn_save {
    margin: 30px auto 0;
    text-align: center;
}

.popup .btn_save button {
    padding: 10px 30px;
}
</style>