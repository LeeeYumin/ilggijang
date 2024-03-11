<template>
  <div class="top_con">
    <div class="container">
      <h3 class="mb-4 title">마이페이지</h3>
      <div class="tR"><p><span class="point">{{ userInfo.name }}</span>님, 오늘도 좋은하루 보내세요 <font-awesome-icon icon="fa-solid fa-face-laugh-wink" size="lg" style="color:#fff;"/></p></div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="content">
      <div class="list">
        <ul>
          <li>
            <div><p>내정보</p><p class="ico"><font-awesome-icon icon="fa-regular fa-user" size="2xl" style="color:#303d8f;" /></p></div></li>
          <li><div><p>내리뷰</p><p class="ico"><font-awesome-icon icon="fa-solid fa-pencil" size="2xl" style="color:#303d8f;" /></p></div></li>
          <li>
            <router-link to="/mypage/save">
              <div><p>찜</p><p class="ico"><font-awesome-icon :icon="['far', 'thumbs-up']" size="2xl" style="color:#303d8f;" /></p></div>
            </router-link>
            </li>
          <li><div><p>1:1문의</p><p class="ico"><font-awesome-icon :icon="['far', 'comments']" size="2xl" style="color:#303d8f;" /></p></div></li>
          
            <li>
              <router-link to="/mypage/myorderlist">
                <div><p>내주문내역</p><p class="ico"><font-awesome-icon :icon="['fas', 'list']" size="2xl" style="color:#303d8f;" /></p></div>
              </router-link>
           </li>
            <li><div><p>회원탈퇴</p><p class="ico"><font-awesome-icon :icon="['fas', 'right-to-bracket']" size="2xl" style="color:#303d8f;" /></p></div></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container">
    <router-view />
  </div>

  
</template>

<style scoped>
.top_con{width:100%; height:100%; padding:40px 20px; background-image:linear-gradient(to right, #3aa69a, #5055b1); box-sizing:border-box;}
.top_con .container{display:flex; justify-content:space-between; align-items:center;}
.top_con .container h3{margin-bottom:0 !important;}
.container{position:relative;}
.title{color:#fff; font-weight:700;}
.content{position:relative;}
.tR{color:#fff; text-align:right;}
.tR p{display:inline-block; margin-bottom:0; padding:10px 20px; font-size:15px; background:rgba(0, 0, 0, 0.1); border-radius:10px; box-sizing:border-box;}
.point{display:inline-block; font-size:18px; font-weight:700;}
.color{color:#0d6efd; font-weight:700;}
.list{border:0;}
.list ul{list-style:none; display:flex; justify-content:space-between; gap:1%; flex-flow:wrap; margin-left:0; padding-left:0;}
.list ul li{flex:1 1 20%; margin-bottom:1%;}
.list ul li a{text-decoration:none;}
.list ul li div{min-height:130px; padding:20px; border:1px solid #eaeaea; background:#f7f7f7; border-radius:10px; box-sizing:border-box;}
.list ul li:nth-child(5) div,
.list ul li:nth-child(6) div{background:#fff;}
.list ul li div p:not(.ico){font-size:16px; color:#333; font-weight:700;}
.list ul li div .ico{margin:25px 0 0; text-align:right;}
</style>

<script>
  import axios from 'axios';
  // import MyOrderListView from '../views/MyOrderListView';

  export default {
    // components : {
    //   MyOrderListView
    // },
    data() {
      return {
        userInfo: {
          name : '',
        },
      }
    },
    created(){
        let userId = this.$route.query.userId;
        this.getUserInfo(userId);
    },
    methods : {
      async getUserInfo(){
        let userId = this.$store.state.id;
        let result = await axios.get('/api/user/' + userId) // + no
                      .catch(err => console.log(err));
        console.log(result);
        this.userInfo = result.data;
        }
    }
  }

</script>