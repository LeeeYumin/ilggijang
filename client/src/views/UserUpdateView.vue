
<template>
  <div class="container">
    <h3 class="text-center">회원 정보 수정</h3>
    <div class="row">
      <table class="table">
        <div class="form-item col-lg-6 my-3">
          <label class="bold">No.<sup></sup></label>
          <input
            type="text"
            class="form-control"
            
            id="user_no"
            v-model="userInfo.user_no"
            readonly
          />
        </div>

        <div class="form-item col-lg-6">
          <label class="bold">ID<sup></sup></label>
          <input
            type="text"
            class="form-control"
           
            id="id"
            v-model="userInfo.id"
            readonly
          />
        </div>
        <div class="form-item col-lg-6">
          <label class="bold">비밀번호<sup>*</sup></label>
          <input
            type="password"
            class="form-control"
            placeholder="비밀번호 입력"
            id="pw_no"
            v-model="userInfo.pw_no"
          />
        </div>
        <div class="form-item col-lg-6 my-3">
          <label class="bold">이름<sup>*</sup></label>
          <input
            type="text"
            class="form-control"
            placeholder="이름 입력"
            id="name"
            v-model="userInfo.name"
          />
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-6 my-3">
            <div class="form-item w-100">
              <label class="bold">기본주소<sup>*</sup></label>
              <!-- <input
                type="text"
                class="form-control"
                placeholder="우편번호"
                id="postcode"
                v-model="userInfo.postcode"
                readonly
              /> -->
            </div>
          </div>
          <div class="col-md-12 col-lg-6">
            <div class="form-item w-100">
              <br /><br />
              <div>
                <OpenPostcode @postcode="getCode" />
              </div>
              <!-- <button type="button" class="btn border-secondary px-4 text-primary" @click="openPostcode()">우편번호 검색</button> -->
            </div>
          </div>
        </div>
        <div class="form-item">
          <!-- <input type="text" class="form-control" placeholder="우편번호" id="postcode" v-model="userInfo.postcode" readonly>  -->
          <input
            type="text"
            class="form-control"
            placeholder="도로명주소"
            id="addr"
            v-model="userInfo.addr"
            readonly
          />
          <input
            type="text"
            class="form-control my-3"
            placeholder="상세주소"
            id="detail_addr"
            v-model="userInfo.detail_addr"
          />
        </div>
        <div class="form-item col-lg-6 my-3">
          <label class="bold">휴대전화<sup>*</sup></label>
          <input
            type="text"
            class="form-control"
            placeholder="'-'없이 숫자만 입력"
            id="phone"
            v-model="userInfo.phone"
          />
        </div>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-info" @click="updateInfo()">저장</button>
    </div>
  </div>
</template>
 
 <script>
import axios from "axios";
import OpenPostcode from "../components/OpenPostcode.vue";

export default {
  data() {
    return {
      // chkVal : '아니오',
      // 사용자 입력 전까지 공백
      userInfo: {
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
    let id = this.$route.query.id;
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

      this.userInfo = info;
    },
    
    updateInfo() {
      if (!this.validation()) return;

      let data = this.getSendData();

      axios
        .put("/api/user/" + this.userInfo.id, data)
        .then((result) => {
          console.log(result);

          let count = result.data.changedRows;
          if (count == 0) {
            alert(
              `수정되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`
            );
            
            this.$router.push({ path: "/admin/userList" });
          } else {
            this.$router.push({
              path: "/userInfo",
              query: { id: this.userInfo.id },
            });
            alert(`정상적으로 수정되었습니다.`);
          }
        })
        .catch((err) => console.log(err));
      this.$router.push({ path: "/admin/user" });
    },
    validation() {
      if (this.userInfo.pw_no == "") {
        alert("비밀번호가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo.addr == "") {
        alert("주소가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo.detail_addr == "") {
        alert("상세주소가 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo.user_name == "") {
        alert("이름이 입력되지 않았습니다.");
        return false;
      }
      if (this.userInfo.phone == "") {
        alert("연락처가 입력되지 않았습니다.");
        return false;
      }
      return true;
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.userInfo.addr = data.roadAddress;
        },
      }).open();
    },
    getCode(zonecode, roadAddress) {
      this.userInfo.addr = roadAddress;
    },
    getSendData() {
      let obj = this.userInfo;
      let delData = ["user_no", "id"];
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
    }
  
  }
};
</script>