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
            <b-form-input class="mr-2 p-1" placeholder="도서명을 입력해주세요" v-model="text"></b-form-input>
            <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">검색</b-button>
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
        text: ''
      }
    }
  }
</script>

<style scoped>
.logo {
  float: left;
}
</style>
