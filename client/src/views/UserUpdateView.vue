
<template>
  <div class="container">
    <h3>회원 정보 수정</h3>
    <table class="table">
      <colgroup>
          <col span="1" width="15%;">
          <col span="1" width="85%;">
        </colgroup>
      <tbody>
        <tr>
          <th>No</th>
          <td><input
          type="text"
          class="form-control"
          
          id="user_no"
          v-model="userInfo2.user_no"
          readonly
        /></td>
        </tr>
        <tr>
          <th>ID</th>
          <td><input
          type="text"
          class="form-control"
          
          id="id"
          v-model="userInfo2.id"
          readonly
        /></td>
        </tr>
        <tr>
          <th>비밀번호<sup>*</sup></th>
          <td><input
          type="password"
          class="form-control"
          placeholder="비밀번호 입력"
          id="pw_no"
          v-model="userInfo2.pw_no"
        /></td>
        </tr>
        <tr>
          <th>이름<sup>*</sup></th>
          <td><input
          type="text"
          class="form-control"
          placeholder="이름 입력"
          id="name"
          v-model="userInfo2.name"
        /></td>
        </tr>
        <tr>
          <th>기본주소<sup>*</sup></th>
          <td>
            <!-- <input
              type="text"
              class="form-control"
              placeholder="우편번호"
              id="postcode"
              v-model="userInfo.postcode"
              readonly
            /> -->
        <div class="col-md-12 col-lg-6">
          <div class="form-item w-100">
            <div>
              <OpenPostcode @postcode="getCode" />
            </div>
            <!-- <button type="button" class="btn border-secondary px-4 text-primary" @click="openPostcode()">우편번호 검색</button> -->
          </div>
        </div>
        <div class="form-item">
          <!-- <input type="text" class="form-control" placeholder="우편번호" id="postcode" v-model="userInfo.postcode" readonly>  -->
          <input
            type="text"
            class="form-control"
            placeholder="도로명주소"
            id="addr"
            v-model="userInfo2.addr"
            readonly
          />
          <input
            type="text"
            class="form-control my-3"
            placeholder="상세주소"
            id="detail_addr"
            v-model="userInfo2.detail_addr"
          />
        </div>
      </td>
        </tr>
        <tr>
          <th>휴대전화<sup>*</sup></th>
          <td><input
          type="text"
          class="form-control"
          placeholder="'-'없이 숫자만 입력"
          id="phone"
          v-model="userInfo2.phone"
        /></td>
        </tr>
      </tbody>
    </table>

    <div class="btn_box">
      <button class="btn btn-outline-primary" @click="updateInfo()">저장</button>
    </div>
  </div>
</template>
 
<style scoped>
  .container{padding-top:50px; margin-bottom:50px;}
  h3{font-weight:700;}
  .table{margin-top:20px; border-top:1px solid #111; text-align:left;}
  .table tr{border-bottom:1px solid #ddd;}
  .table tr th{padding-left:20px; background:#fbfbfb; vertical-align:middle;}
  .table tr td{padding:10px; padding-left:20px; vertical-align:middle;}
  .table tr td input{margin-bottom:0;}
  #addr{margin-top:5px !important;}
  #detail_addr{margin-top:5px !important;}
  .btn_box{margin-top:20px; text-align:center;}
  .btn_box button{padding:10px 30px;}
  sup{color:red;}
</style>

 <script>
import axios from "axios";
import OpenPostcode from "../components/OpenPostcode.vue";

export default {
  data() {
    return {
      // chkVal : '아니오',
      // 사용자 입력 전까지 공백
      userInfo2: {
        user_no: "",
        id: "",
        pw_no: "",
        name: "",
        addr: "",
        detail_addr: "",
        phone: ""
      }
    };
  },
  created() {
    let id = this.$store.state.id;
    this.getUserInfo(id);
  },
  components: {
    OpenPostcode,
  },
  methods: {
    async getUserInfo(id) {
      let result = await axios
        .get("/api/user/" + id)
        .catch((err) => console.log(err));
      let info = result.data;

      this.userInfo2 = info;
    },
    
    updateInfo() {
      if (!this.validation()) return;

      let data = this.getSendData();
      console.log('확인용',this.userInfo2.id)


      axios
        .put("/api/user/" + this.userInfo2.id, data)
        .then((result) => {
          console.log(result);

          let count = result.data.changedRows;
          if (count == 0) {
            alert(
              `수정되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`
            );
            
            this.$router.push({ path: "/mypage/userInfo2" });
          } else {
            this.$router.push({
              path: "/userInfo2",
              query: { id: this.userInfo2.id },
            });
            alert(`정상적으로 수정되었습니다.`);
            this.$router.push({ path: "/mypage/userInfo2" });
          }
        })
        .catch((err) => console.log(err));
      this.$router.push({ path: "/user" });
    },
    validation() {
      if (this.userInfo2.pw_no == "") {
        alert("비밀번호가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo2.addr == "") {
        alert("주소가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo2.detail_addr == "") {
        alert("상세주소가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo2.user_name == "") {
        alert("이름이 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo2.phone == "") {
        alert("연락처가 입력되지 않았습니다.");
        return false;
      }
      return true;
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.userInfo2.addr = data.roadAddress;
        },
      }).open();
    },
    getCode(zonecode, roadAddress) {
      this.userInfo2.addr = roadAddress;
    },
    getSendData() {
      let obj = this.userInfo2;
      let delData = ["user_no", "id", "birth_date","gender_code","login_type_code","age_code"];
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
        param: newObj,
      };
      return newData;
    },
    dataFormat(value) {
      let result = null;
      if (value != null) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        result = `${year}-${month}-${day}`;
      }
      return result;
    }
  
  }
};
</script>