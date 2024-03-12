<template>
    <div class="container">
        <div class="popup">
            <div class="con">
                <div class="title">
                    <h2 v-if="rno != '/0'">리뷰 수정</h2>
                    <h2 v-if="rno == '/0'">리뷰 등록</h2>
                    <button @click="$emit('close')" class="btn_close"><font-awesome-icon icon="fa-solid fa-x"
                            size="xl" /></button>
                </div>
                <div>
                    <p>도서 제목 : {{ rbnm }}</p>
                </div>
                <div class="row">
                    <div class="col-md-12 col-lg-6 my-3">
                        <p>평점 : </p>
                        <div class="grade">
                            <font-awesome-icon class="star" :key="g" v-for="g in jsons.grade" :value="g" type="button"
                                :icon="['fas', 'star']" style="color: #3a4ca8;"
                                @click.capture="jsons.grade = parseInt(g)" />
                            <font-awesome-icon class="star" :key="g" v-for="g in 5 - jsons.grade"
                                :value="g + jsons.grade" type="button" :icon="['far', 'star']" style="color: #3a4ca8;"
                                @click.capture="jsons.grade = parseInt(g + jsons.grade)" />
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <p>내용 : </p>
                    <textarea cols="30" rows="10" class="form-control" placeholder="내용을 입력하세요" id="addr"
                        v-model="jsons.content"></textarea>
                </div>
                <div class="btn_save">
                    <button class="btn btn-primary" :disabled="rgrade == jsons.grade && rcontent == jsons.content"
                        @click="updateReview()">확인</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 데이터 확인용
    <tr>
        <input type="text" v-model="jsons.orders_detail_no" readonly />
    </tr>
    <tr>
        <input type="text" v-model="jsons.prdt_no" readonly />
    </tr>
    <tr>
        <input type="text" :value="rno" readonly />
    </tr> -->
</template>

<script>
import axios from 'axios';

export default {
    emits: ['close', 'save'],
    props: {
        rno: { type: String, default: '' },
        rgrade: { type: Number, default: null },
        rcontent: { type: String, default: '' },
        rodtno: { type: Number, default: null },
        rpno: { type: String, default: '' },
        rbnm: { type: String, default: '' }
    },
    data() {
        return {
            boardid: 'reviews',
            bookname: '',
            jsons: {
                user_no: this.$store.state.userNo,
                orders_detail_no: this.rodtno,
                grade: this.rgrade,
                prdt_no: this.rpno,
                content: this.rcontent
            }
        }
    },
    created() {
        if (this.$route.query.bookNo != '' && this.$route.query.bookNo != undefined && this.$route.query.bookNo != null) {
            this.jsons.prdt_no = this.$route.query.bookNo;
        }
    },
    methods: {
        async updateReview() {
            if (this.jsons.grade == 0) {
                return alert('평점을 매겨주세요');
            } else if (this.jsons.content == '') {
                return alert('내용을 입력해주세요');
            }
            await axios.put(`/api/${this.boardid}${this.rno}`, this.jsons)
                .catch(err => console.log(err));
            if (this.rno == '/0') {
                alert('등록되었습니다.');
                if (confirm('내 리뷰 목록으로 이동하시겠습니까?')) {
                    this.$router.push({ path: '/mypage/myreview' });
                } else {
                    this.$emit('save');
                }
            }
            else {
                alert('수정되었습니다.');
                this.$emit('save');
            }
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

.star {
    stroke-opacity: 0%;
}

.grade {
    display: inline-block;
    position: relative;
    z-index: 0;
    visibility: hidden;
}

.star {
    z-index: 100;
    visibility: visible;
}
</style>