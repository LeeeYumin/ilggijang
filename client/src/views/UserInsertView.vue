<!-- UserInsertView.vue -->
<template>
    <div class="container">
     <h1>회원 정보 등록</h1>
     <div class="row">
       <table class="table">
         <tr>
           <th class="text-right table-primary">No.</th>
           <td class="text-center">
             <input class="form-control" type="number" v-model="userInfo.user_no" readonly>
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">ID</th>
           <td class="text-center">
             <input class="form-control" type="text" v-model="userInfo.id">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">비밀번호</th>
           <td class="text-center">
             <input class="form-control" type="password" v-model="userInfo.pw_no">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">이름</th>
           <td class="text-center">
             <input class="form-control" type="text" v-model="userInfo.name">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">연락처</th>
           <td class="text-center">
             <input class="form-control" type="text" v-model="userInfo.phone">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">메일</th>
           <td class="text-center">
             <input class="form-control" type="email" v-model="userInfo.mail">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">생년월일</th>
           <td class="text-center">
             <input class="form-control" type="date" v-model="userInfo.birth_date">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">주소</th>
           <td class="text-center">
             <input class="form-control" type="text" v-model="userInfo.addr">
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">상세주소</th>
           <td class="text-center">
             <input class="form-control" type="text" v-model="userInfo.detail_addr">
           </td>
         </tr>
         
         <tr>
           <!-- 남녀 -->
           <th class="text-right table-primary">성별</th>
           <td class="text-center">
             <!-- vue에서 id, name 속성 사용 안함 -->
             <input type="radio" value="M" v-model="userInfo.gender"> 남
             <input type="radio" value="F" v-model="userInfo.gender"> 여
             <!-- <input true-value="예" false-value="아니오" v-model="chkVal"> -->
           </td>
         </tr>
         <tr>
           <th class="text-right table-primary">나이</th>
           <td class="text-center">
             <input class="form-control" type="number" min="0" v-model="userInfo.age_code">
           </td>
         </tr>
         <tr>
           <!-- 년월일 -->
           <th class="text-right table-primary">가입일자</th>
           <td class="text-center">
             <input class="form-control" type="date" v-model="userInfo.join_date"> <!-- yyyy-MM-dd -->
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
       userInfo: {
         user_no : null,
         id : "",
         pw_no : "",
         name : "",
         age_code : "",
         gender : null,
         join_date : null,
         phone : "",
         mail : "",
         birth_date : "",
         addr : "",
         detail_addr : ""
        
       }
     }
   },
   created() {  //기본세팅을 할때도 사용가능.
     this.userInfo.join_date = this.getToday();
   },
   methods : {
     //날짜를 오늘날짜로 하는것.
     getToday(){
       let date = new Date();
       let year = date.getFullYear();
       let month = ('0' + (date.getMonth()+1)).slice(-2);
       let day = ('0' + date.getDate()).slice(-2);
       return `${year}-${month}-${day}`;
     },
     insertInfo() {
       // 1) 유효성 체크
       if(!this.validation()) return;
 
       // 2) ajax
       // 2-1) 실제 보낼 데이터 선별
       let data = this.getSendData();
 
       // 2-2) axios 이용해 ajax
       axios
       .post('/api/user', data)
       .then(result => {
         // 3) 결과 처리
         let user_no = result.data.insertId;
         if(user_no == 0){
           alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`);
         }
         else {
           alert(`정상적으로 등록되었습니다.`);
           this.userInfo.user_no = user_no;
         }
       })
       .catch(err => console.log(err));
 
 
     },
     validation() {
       if(this.userInfo.id == '') {
         alert('아이디가 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.pw_no == '') {
         alert('비밀번호가 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.name == '') {
         alert('이름이 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.mail == '') {
         alert('메일이 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.phone == '') {
         alert('번호가 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.birth_date == '') {
         alert('생년월일이 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.addr == '') {
         alert('주소가 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.name == '') {
         alert('이름이 입력되지 않았습니다.');
         return false;
       }
       if(this.userInfo.age_code == '') {
         alert('나이가 입력되지 않았습니다.');
         return false;
       }
       
       return true;
     },
     getSendData() {
       let obj = this.userInfo;
       let delData = ["user_no"];
       let newObj = {};
 
       let isTargeted = null;
       for(let field in obj){
           isTargeted = false;
           for(let target of delData){
               if(field == target){
                 isTargeted = true;
                 break;
               }
           }
           if(!isTargeted){
             newObj[field] = obj[field];
           }
       }
       let newData = { 
         "param" : newObj
       }
       return newData;
     }
   }
 }
 </script>