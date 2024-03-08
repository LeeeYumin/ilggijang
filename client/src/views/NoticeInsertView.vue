<template>
    <div class="container">
        <h3 class="text-center">공지사항 등록</h3>
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="noticeInfo.notice_no" readonly>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">제목</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="noticeInfo.title">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">내용</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="noticeInfo.content">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">작성일</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="noticeInfo.reg_date">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">조회수</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="noticeInfo.hit_cnt" readonly>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">개시일</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="noticeInfo.fix_start_date">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">개시종료일</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="noticeInfo.fix_end_date">
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="insertInfo()">저장</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // chkVal : '아니오',
            // 사용자 입력 전까지 공백 
            noticeInfo: {
      
                title: '',
                content: '',
                reg_date: '',      
                fix_start_date: '',
                fix_end_date: ''
            }
        }
    },
    created() {
        this.noticeInfo.reg_date = this.getToday();
        this.noticeInfo.fix_start_date = this.getToday();
        this.noticeInfo.fix_end_date = this.getToday();
    },
    methods: {
        async insertInfo() {
            console.log('클릭됨')
            // 1) 유효성 체크
            if (!this.validation()) return;


            let data = {
                param: this.noticeInfo
            };


            console.log(data);
            // 2-2) axios 이용해 ajax
            await axios
                .post('/api/notice', data)  //http://localhost:3000/notice/
                .then(result => {
                    // 3) 결과 처리
                    let notice_no = result.data.notice_no;
                    if (notice_no == 0) {
                        alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`);
                    }
                    else {
                        alert(`정상적으로 등록되었습니다.`);
                        this.noticeInfo.notice_no = notice_no;
                    }
                    this.$router.push({ path: '/admin/notice' })
                })
                .catch(err => console.log(err));

        },
        validation() {
            if (this.noticeInfo.title == '') {
                alert('제목이 입력되지 않았습니다.');
                return false;
            }
            if (this.noticeInfo.content == '') {
                alert('내용이 입력되지 않았습니다.');
                return false;
            }
            return true;

        },
        getSendData() {
            console.log('실행됨')
            let obj = this.noticeInfo;
            let delData = ["notice_no"];
            let newObj = {};

            let isTargeted = null;
            for (let field in obj) {
                isTargeted = false;
                for (let target of delData) {
                    if (field == target) {
                        isTargeted = true;
                        break;
                    }
                }
                if (!isTargeted) {
                    newObj[field] = obj[field];
                }
            }
            let newData = {
                "param": newObj
            }
            return newData;
        },
        getToday() {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        }
    }
}
</script>