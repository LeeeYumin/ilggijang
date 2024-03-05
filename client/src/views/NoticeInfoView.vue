<template>
    <div class="container">
        <h1>회원 정보 조회</h1>
        <div class="row">
      <table class="table">
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.notice_no }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.title }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.content }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.reg_date }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.hit_cnt }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.type }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.fix_start_date }}</td>
        </tr>
        <tr>
            <th class="text-right table-primary">No.</th>
            <td class="text-center">{{ noticeInfo.fix_end_date }}</td>
        </tr>
        

      </table>

        </div>
        <div class="row">
      <button class="btn btn-info col-4" @click="goToUpdate(noticeInfo.notice_no)">수정</button>
      <router-link to="/" class="btn btn-success col-4">목록</router-link>
      <button class="btn btn-warning col-4" @click="deleteInfo(noticeInfo.notice_no)">삭제</button>
    </div>
    </div>

</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            noticeInfo : {}
        }
    },
  
  methods : {
    async getNoticeInfo(Id) {
      let result = await axios.get('/api/admin/notice/' + notice_id)
                              .catch(err => console.log(err));
      let info = result.data;
      this.noticeInfo = info; 
    },
    dataFormat(value) {
      let result = null;
      if(value != null){
        let date = new Date(value);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        result = `${year}-${month}-${day}`
      }
      return result;
    }
  }
,
    goToUpdate(Id) {
      // 수정폼 컴포넌트 호출
      //this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});  
      this.$router.push({ path: '/noticeForm', query: {'notice_id' : notice_id}});
    },
    deleteInfo(Id) {
      // 서버의 해당 데이터 삭제
      console.log(Id);
      axios
      .delete(`/api/admin/notice/${notice_id}`)
      .then(result => {
          if(result.data.affectedRows != 0 && result.data.changedRows == 0){
              alert(`정상적으로 삭제되었습니다.`);
               this.$router.push({path : '/'});
          }else{
              alert(`삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
          }
      })
      .catch(err => console.log(err));
    }
  }







</script>