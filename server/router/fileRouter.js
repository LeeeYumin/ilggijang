const express =  require('express');
const fileRouter = express.Router();
const db = require("../db.js");
const multer = require('multer');


// 함수
const storage = multer.diskStorage({ // 디스크 저장소 정의
  destination : function(req, file, cb) {
    cb(null, 'files/'); // 콜백함수를 통해 전송된 파일 저장 디렉터리 설정
  },
  filename : function(req, file, cb) { // file : 넘어온 파일에 대한 정보가 있음
    let rename = (new Date()).getMilliseconds() + file.originalname;
    cb(null, rename); // 밀리초+파일이름으로 파일이름 재설정(파일 이름 충돌방지)
  }
});

const upload = multer({ storage : storage }); // multer 객체생성
const staticUrl = '/images';

fileRouter.use(staticUrl, express.static('files'));

// 멀티
fileRouter.post('/photos', upload.array('fileList'), async (req, res) => {
  // ★ multer가 인식할 수 있도록 array('이름과') <input name="이름"> 이 같게 ★
  let imgUrlList = [];
  for(let file of req.files){
    let imgUrl = `files${staticUrl}/${file.filename}`;

    // 문자열 잘라서 파일명만 담기
    // let newfileName = file.filename.

    let data = {
        file_path: `files${staticUrl}`, // 파일경로
        file_name: file.filename, // 파일 이름
        extension: ".jpg", // 확장자명
        seq: 1, // 배치순서
        table_type_code: "f2", // f1 공지사항, f2 리뷰, f3 1:1문의
        table_row_no: 1 // 테이블 행 번호
    }
    // DB insert 첨부파일 정보를 DB에 저장
    let result = await db.connection('file', 'fileInsert', data);

    imgUrlList.push(imgUrl);
  }
  res.send(result); // 결과반환
});





// 첨부파일 정보 전체조회
fileRouter.get('/', async (req, res) => {
  let result = await db.connection('file','fileList');
  res.send(result);
})

module.exports = fileRouter;