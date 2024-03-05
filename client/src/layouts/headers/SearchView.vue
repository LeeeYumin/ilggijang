<template>
  <div class="container">
    <div class="row">
      <div class="logo col-2 my-3">
        <router-link to="main">
            <img src="@/assets/ilggijang_logo.png" style="width: 100px;">
        </router-link>
      </div>
      <div class="search_input col-10 my-3">
        <b-navbar  type="light" variant="light" class="my-3">
          <b-nav-form>
            <b-form-input class="mr-2 p-1" placeholder="도서명을 입력해주세요" v-model="text"></b-form-input>  <!--@keyup.enter="searchWord(this.text)"-->
            <b-button variant="outline-success" class="my-2 my-sm-0" type="submit" @click="searchWord()">검색</b-button>
          </b-nav-form>
        </b-navbar>
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
  float: left;
}
</style>
