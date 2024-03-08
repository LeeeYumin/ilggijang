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
        <button class="btn" @click="sendFiles()">멀티 파일 전송</button>
      <!-- </form> -->
    </div>
    
    <div>
      <h6>업로드 할 파일 미리보기(1개만 보임)</h6>
      <img :src="this.imgUrl">
    </div>

    <!-- 라디오버튼 -->
    <div>
    <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Option A</b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Option B</b-form-radio>
    </b-form-group>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>

    <div>
      <img src="http://localhost:3000/files/download?pno=BK240228002">
      <button @click="getFile('BK240228002')">파일 가져오기</button>
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
        },
        getImgUrl : '',
        selected: ''
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
      },
      async getFile(pno) { // DB에서 파일 가져오기
        await axios.get('/api/files/download?pno=' + pno)
                    .then(result => {
                      console.log('파일 담기',result)
                      // http://localhost:3000/files/download?pno=BK240228002
                      // return new URL(this.url + '/files/download?pno=' + pno);
        });
      }
    }
  }
</script>
