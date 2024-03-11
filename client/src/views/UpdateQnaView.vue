<template>
    <div class="container">
        <div class="form-qry">
            <p>Q : </p>
            <p v-if="upform == false">{{ qcont }}</p>
            <div v-if="usno == userno && upform == false && repstate == 'a1'" class="btns">
                <button @click="upform = true">수정</button>
                <button @click="DeleteMyQ(qano)">삭제</button>
                <p>* 수정 및 삭제는 '답변대기' 상태일때만 가능합니다</p>
            </div>
            <textarea v-if="upform == true" v-model="jsons.qry_content" placeholder="내용을 입력하세요" cols="30"
                rows="10"></textarea>
        </div>
        <div v-if="repstate == 'a2'" class="form-reply">
            <p>A : </p>
            <p>{{ acont }}</p>
            <!-- <textarea cols="30" rows="10" class="form-control" placeholder="답변내용을 입력하세요" id="addr"
                v-model="jsons.content"></textarea> -->
        </div>
        <div v-if="upform == true" class="btn_save">
            <button class="btn btn-primary" @click="updateQ()" :disabled="qcont == jsons.qry_content">확인</button>
            <button class="btn btn-primary" @click="upform = false">취소</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    emits: ['close', 'save', 'refreon'],
    props: {
        repstate: { type: String, default: '' },
        qano: { type: String, default: '' },
        usno: { type: Number, default: null },
        qcont: { type: String, default: '' },
        acont: { type: String, default: '' }
    },
    data() {
        return {
            boardid: 'qnas',
            upform: false,
            userno: this.$store.state.userNo,
            jsons: {
                qry_content: this.qcont
            }
        }
    },
    
    methods: {
        async updateQ() {
            if (this.jsons.qry_content == '') {
                return alert('내용을 입력해주세요');
            }
            await axios.put(`/api/${this.boardid}${this.qano}`, this.jsons)
                .catch(err => console.log(err));
            this.$emit('refreon', true);
            this.upform = false;
            alert('수정되었습니다.');
        },
        async DeleteMyQ(qno) {
            let delchk = confirm('정말로 삭제하시겠습니까?');
            if (delchk) {
                await axios.delete(`/api/qnas${qno}`)
                    .catch(err => console.log(err));
                alert('삭제되었습니다.');
                this.$emit('refreon', true);
            }
        }
    }
}
</script>

<style scoped></style>