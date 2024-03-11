<template>
    <div class="container">
        <div class="form-qry">
            <p>Q : </p>
            <p></p>
            <div v-if="uno == user_no" class="btns">
                <button>수정</button>
                <button @click="DeleteMyQna(qno)">삭제</button>
            </div>
            <textarea placeholder="내용을 입력하세요" cols="30" rows="10"></textarea>
        </div>
        <div v-if="repstate == 'a2'" class="form-reply">
            <p>A : </p>
            <p></p>
            <!-- <textarea cols="30" rows="10" class="form-control" placeholder="답변내용을 입력하세요" id="addr"
                v-model="jsons.content"></textarea> -->
        </div>
        <div class="btn_save">
            <button class="btn btn-primary" @click="updateQ()">확인</button>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    emits: ['close', 'save', 'refreon'],
    props: {
        repstate: { type: Boolean, default: false },
        qno: { type: String, default: '' },
        uno: { type: Number, default: null}
    },
    data() {
        return {
            boardid: 'qnas',
            jsons: {
                user_no: this.$store.state.userNo,
                prdt_no: '',
                content: ''
            }
        }
    },
    created() {
        this.jsons.prdt_no = this.$route.query.bookNo;
    },
    methods: {
        async updateQ() {
            if (this.jsons.content == '') {
                return alert('내용을 입력해주세요');
            }
            await axios.put(`/api/${this.boardid}${this.qno}`, this.jsons)
                .catch(err => console.log(err));
            this.$emit('save');
            alert('수정되었습니다.');
        },
        async DeleteMyQ(qno) {
            let delchk = confirm('정말로 삭제하시겠습니까?');
            if (delchk) {
                await axios.delete(`/api/qnas/${qno}`)
                    .catch(err => console.log(err));
                alert('삭제되었습니다.');
                this.$emit('refreon', true);
            }
        }
    }
}
</script>

<style scoped></style>