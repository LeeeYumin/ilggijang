<template>
  <div class="container">
    <form @submit.prevent >

    <h1>상품관리</h1> <!--메모 API 토스트로 이미지.. 등..?-->

      <label for="book_name">도서명</label>
      <input type="text" id="book_name" v-model="productInsert.book_name">
      
      <label for="book_price">가격</label>
      <input type="text" id="book_price"  v-model="productInsert.book_price">

      <label for="title">저자</label>
      <input type="text" id="title" v-model="productInsert.title">

      <label for="isbn">ISBN</label>
      <input type="text" id="isbn" v-model="productInsert.isbn">

      <label for="publ_co">출판사</label>
      <input type="text" id="publ_co" v-model="productInsert.publ_co" >

      <label for="book_intro">책소개</label>
      <textarea type="text" id="book_intro" style="height:200px" v-model="productInsert.book_intro"></textarea>

      <label for="book_img">이미지</label>
      <input type="text" id="book_img" v-model="productInsert.book_img" >

      <label for="detail_exp">도서상세설명</label>
      <textarea type="text" id="detail_exp" style="height:200px" v-model="productInsert.detail_exp" ></textarea>

      <button type="button" class="btn btn-xs btn-info"
              @click="isUpdated ? productUpdate() : productsInsert()">저장</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      productInsert : {
        book_name : '',
        book_price : '',
        title : '',
        isbn : '',
        publ_co : '',
        book_intro : '',
        book_img : '',
        detail_exp : ''
      },
      isUpdated : false
    };
  },

  created() {
    let pno = this.$route.query.prdtNo;
        if(pno > 0){
            //수정
            //1) 단건조회 선행
            this.getproductDetailInfo(pno);
            //2) 저장버튼 -> 수정기능 변경
            this.isUpdated = true;
        }else{
            //등록
            this.productsInsert;
        }
    },

    methods : {
      async productsInsert(){
        let data = {
          param : {
            book_name : '',
            book_price : '',
            title : '',
            isbn : '',
            publ_co : '',
            book_intro : '',
            book_img : '',
            detail_exp : ''
          }
        };

        let result = await axios.post("/api/product/", data)
                                .catch(err => console.log(err));

        let info = result.data.insertId;
        if(info > 0) {
          alert('도서가 등록되었습니다');
          this.productInsert.pno = info;
            }
    },

      async getproductDetailInfo(pno) {
        let result = await axios.get("/api/product/" + pno) //admin/product ?
                    .catch(err => console.log(err));
        this.getproductDetailInfo = result.data;
      },

      async productUpdate(){
        let data = {
          param : {
            book_name : '',
            book_price : '',
            title : '',
            isbn : '',
            publ_co : '',
            book_intro : '',
            book_img : '',
            detail_exp : ''
          }
        };
            let result = await axios.put("/api/product/" + this.getproductDetailInfo.pno , data)
                                .catch(err => console.log(err));

            let info = result.data.changedRows;
            if(info > 0) {
                alert('도서 정보가 수정되었습니다');
            }
      }
  }
}
</script>


<style>
input[type=text], select, textarea {
  width: 100%; 
  padding: 5px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  box-sizing: border-box; 
  margin-bottom: 5px; 
  resize: vertical 
}
</style>
