<template>
  <div class="container">
    <form @submit.prevent >

      <h3 class="text-center">{{ title }}</h3> <!--메모 API 토스트로 이미지 등..?-->

      <label for="book_name">도서명</label>
      <input type="text" class="form-control" id="book_name" v-model="productInsert.book_name">

      <label for="book_price">가격</label>
      <input type="number" class="form-control" id="book_price"  v-model="productInsert.book_price">

      <label for="title">저자</label>
      <input type="text" class="form-control" id="title" v-model="productInsert.title">

      <label for="isbn">ISBN</label>
      <input type="text" class="form-control" id="isbn" v-model="productInsert.isbn">

      <label for="publ_co">출판사</label>
      <input type="text" class="form-control" id="publ_co" v-model="productInsert.publ_co" >

      <div class="mb-3">
          <label class="form-label">이미지 업로드</label>
          <input class="form-control" type="file" ref="images" accept="image/*"
                  multiple
                  @change="showThumbnail()"
                  name="fileList">
          <button class="btn btn-primary mt-3" @click="sendFiles()">이미지 파일 업로드</button>
      </div>

      <div class="border col-4">
        <h6>업로드 할 파일 미리보기</h6>
        <img :src="this.imgUrl" style="width: 200px;">
      </div>

      <label for="detail_exp">도서상세설명</label>
      <textarea type="text" class="form-control" id="detail_exp" style="height:200px" v-model="productInsert.detail_exp" ></textarea>

      <label for="publ_date">출간일</label>
      <input type="date" class="form-control" id="publ_date" v-model="productInsert.publ_date" >

      <label for="category_code">카테고리</label>
      <input type="text" class="form-control" id="category_code" v-model="productInsert.category_code" >

      <button type="button" class="btn btn-xs btn-info"
              @click="isUpdated ? productUpdate() : prdtInsert()">저장</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      productInsert : { // 타입만 지정. 비워놔도 됨.
        book_name : '',
        book_price : '',
        title : '',
        isbn : '',
        publ_co : '',
        book_img : '',
        detail_exp : '',
        uploadedImg : '' // 첨부된 파일명
      },
      isUpdated : false,
      files : [],
        imgUrl : '',
        input: {
          image: ''
        },
        getImgUrl : '',
        selected: ''
    };
  },
  computed : {
    title(){
      return this.isUpdated ? '도서 정보 수정' : '도서 정보 등록';
    }
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
            this.prdtInsert();
        }
    },

    methods : {
      async prdtInsert(){
        let data = {
          param :[
            this.productInsert.isbn, //v-바인딩 된 정보를 위에서 넣어줌.
            this.productInsert.book_name,
            this.productInsert.uploadedImg,
            this.productInsert.title,
            this.productInsert.publ_co,
            this.productInsert.book_price,
            this.productInsert.detail_exp,
            this.productInsert.publ_date,
            this.productInsert.category_code,
          ]

        };
        console.log()
        let result = await axios.post("/api/product", data)
                                .catch(err => console.log(err));

        let info = result.data.affectedRows; //insertId 에서 변경하면 alert 뜸
        if(info > 0) {
          alert('도서가 등록되었습니다');
          this.prdtInsert.pno = info;
        }
      },
      async getproductDetailInfo(pno) {
        let result = await axios.get("/api/product" + pno) //admin/product ?
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
            book_img : '',
            detail_exp : ''
          }
        };
            let result = await axios.put("/api/product" + this.getproductDetailInfo.pno , data)
                                .catch(err => console.log(err));

            let info = result.data.changedRows;
            if(info > 0) {
                alert('도서 정보가 수정되었습니다');
            }
      },
      async sendFiles() { // 파일 전송하기
        const formData = new FormData();
        for(let file of this.input.image){
          // console.log(file)
          formData.append('fileList', file);
        }

        await axios.post('/api/files/uploading', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((result) => {
          if(result.status == 200) {
            alert('파일이 등록 되었습니다.');
          } else if (result.status != 200) {
            alert('파일이 등록이 실패했습니다. 관리자에게 문의해주세요.');
          }
        })
        .catch(err => console.log(err))
      },
      showThumbnail () {
        // refs 속성을 이용해 input 태그에 접근함
        this.input.image = this.$refs.images.files
        console.log(this.input.image);
        // URL.createObjectURL로 사용자가 올린 이미지를 URL로 만들어서 화면에 표시할 수 있게 한다. img 태그의 src값에 바인딩해준다
        this.imgUrl = URL.createObjectURL(this.input.image[0])
        console.log(this.imgUrl)
        console.log(this.input.image[0].name);
        this.productInsert.uploadedImg = this.input.image[0].name
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
