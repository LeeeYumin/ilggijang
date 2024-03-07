<template>
  <div class="container">
    <div class="row">
      <div class="logo">
        <router-link to="main">
            <img src="@/assets/ilggijang_logo.png" style="width: 100px;">
        </router-link>
      </div>
      <div class="search_input">
          <input class="search" placeholder="도서명을 입력해주세요" v-model="text"> <!--@keyup.enter="searchWord(this.text)"-->
          <button variant="outline-success" class="btn_search" type="submit" @click="searchWord()"><font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" style="color:#3a4ca8;" /><span>검색</span></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
        cnt:0
      }
    },
    methods : {
      searchWord() {
        if(this.text !== ''){ //검색어 입력함
          this.$router.push({
            path : "/bookSearch?i="+ (++this.cnt),
            //name : "bookSearch",
            state : { //client.json - vue라우터 버전에 맞춰 수정. params 사용불가.
              text : this.text,
              //isResultShow :true,
            },
          });
         //this.text = ''
          console.log('""', this.text, '""' + '검색')

        } else {
          alert('도서명을 입력해주세요!') //검색어 미입력
        }
      }
    }
  }
</script>

<style scoped>
.logo {
  margin-top:20px;
  float: left;
}
.logo img{width:90px !important;}
.row{position:relative;}
.search_input{position:absolute; left:50%; top:50%; width:500px; height:50px; border:2px solid #3a4ca8; border-radius:50px; transform:translate(-50%, -50%);}
.search_input .search{width:420px; padding:12px; border:0; background:none;}
.search_input .search:focus-visible{outline:0;}
.search_input .btn_search{border:0; background:none;}
.search_input .btn_search span{display:block; text-indent:100%; overflow:hidden; white-space:nowrap;}
</style>
