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
                        <div class="grade" @click.capture="jsons.grade = parseInt($event.target.value)">
                            <button value="1" class="star">★</button>
                            <button value="2" class="star">★</button>
                            <button value="3" class="star">★</button>
                            <button value="4" class="star">★</button>
                            <button value="5" class="star">★</button>
                            <input type="text" v-model="jsons.grade" readonly />
                            <div>
                                <button>첨부파일?</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <textarea cols="30" rows="10" class="form-control" placeholder="내용을 입력하세요" id="addr"
                        v-model="jsons.content"></textarea>
                </div>
                <div class="btn_save">
                    <button class="btn btn-primary" @click="updateReview()">확인</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 데이터 확인용 -->
    <tr>
        <input type="text" v-model="jsons.orders_detail_no" readonly />
    </tr>
    <tr>
        <input type="text" v-model="jsons.prdt_no" readonly />
    </tr>
    <tr>
        <input type="text" :value="rno" readonly />
    </tr>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    emits: ['close'],
    props: {
        rno: { type: String, default: '' }
    },
    data() {
        return {
            boardid: 'reviews',
            jsons: {
                user_no: 2, // this.$store.state.userNo,
                // write_date: null, // sysdate
                orders_detail_no: 100, //
                grade: 0,
                prdt_no: 'BK240228002', //
                content: ''
            },
            write_date: null
        }
    },
    methods: {
        async updateReview() {
            if (this.jsons.grade == 0) {
                return alert('평점을 매겨주세요');
            } else if (this.jsons.content == '') {
                return alert('내용을 입력해주세요');
            }
            this.write_date = await dayjs().format('YYYY-MM-DD');
            let result = await axios.put(`/api/${this.boardid}${this.rno}`, [this.jsons, this.write_date])
                .catch(err => console.log(err));
            console.log(result.data, this.write_date);

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