<template>
  <div class="container">
    <h3>첨부파일</h3>
    <div class="mb-3">
      <form action="http://localhost:3000/files/photos" method="post" enctype="multipart/form-data">
        <label for="formFileMultiple" class="form-label">다중파일 업로드</label>
        <input class="form-control" type="file" name="fileList" multiple v-bind="files"> <!-- ★multer가 인식할 수 있도록 array('이름과') name="이름" 이 같게 -->
        <button>멀티 파일 전송</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files : []
      }
    },
    methods: {
      
    }
  }
</script>
