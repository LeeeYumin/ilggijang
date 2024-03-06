<template>
  <div class="container">
    <h3>첨부파일</h3>
    <div class="mb-3">
      <form action="http://localhost:3000/files/photos" method="post" enctype="multipart/form-data">
        <label for="formFileMultiple" class="form-label">다중파일 업로드</label>
        <input class="form-control" type="file" name="fileList" 
                multiple
                
                ref="images"> <!-- ★multer가 인식할 수 있도록 array('이름과') name="이름" 이 같게 -->
                <!-- @change="showThumbnail()" -->
        <button @click="sendFiles()">멀티 파일 전송</button>
      </form>
    </div>
    
    <div>
      <img :src="this.imgUrl">
      <!-- http://localhost:3000/files/images/262cat_cute.jpg -->
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
        //await axios
      },
      showThumbnail () {
        this.input.image = this.$refs.images.files
        console.log(this.input.image);
        URL.createObjectURL
      },
      getFile() {
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
