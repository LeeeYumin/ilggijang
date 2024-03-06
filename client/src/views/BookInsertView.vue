<template>
  <div class="container">
    <h3>첨부파일</h3>
    <div class="mb-3">
      <!-- <form action="http://localhost:3000/files/photos" method="post" enctype="multipart/form-data"> -->
        <label class="form-label">다중파일 업로드</label>
        <input class="form-control" type="file" ref="images" accept="image/*"
                multiple
                @change="showThumbnail()"
                name="fileList">
        <button @click="sendFiles()">멀티 파일 전송</button>
      <!-- </form> -->
    </div>
    
    <div>
      <h6>업로드 할 파일 미리보기(1개만 보임)</h6>
      <img :src="this.imgUrl">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        files : [],
        imgUrl : '',
        input: {
          image: ''
        }
      }
    },
    created() {
      //this.getFile();
    },
    methods: {
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
            alert('파일이 등록 되었습니다.')
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
      },
      getFile() { // DB에서 파일 가져오기
        axios.get('/api/files')
              .then(result => {
                this.files = result.data[0];
                let dbImgUrl = `${result.data[0].file_path}/${result.data[0].file_name}.${result.data[0].extension}`;
                console.log(dbImgUrl);
                let localhost = "http://localhost:3000/";
                this.imgUrl = localhost + dbImgUrl;
              });
      }
    }
  }
</script>
