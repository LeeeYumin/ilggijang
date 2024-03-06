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
    // 한글 파일명 깨짐 해결
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    let rename = (new Date()).getMilliseconds() + file.originalname;
    cb(null, rename); // 밀리초+파일이름으로 파일이름 재설정(파일 이름 충돌방지)
  }
});

const upload = multer({ storage : storage }); // multer 객체생성
const staticUrl = '/images';

fileRouter.use(staticUrl, express.static('files'));

// 멀티 파일 받아서 file DB에 저장
fileRouter.post('/uploading', upload.array('fileList'), async (req, res) => {
  // ★ multer가 인식할 수 있도록 array('이름과') <input name="이름"> 이 같게 ★

  // 화면에서 넘어올 변수들
  let val = req.body;
  console.log(req);

  let fileValues = [];
  for(let file of req.files){
    // 문자열 잘라서 파일명만 담기
    let newfileName = file.filename.split('.');
    //console.log('파일명과 확장자 분리하기', newfileName[0], newfileName[1]);

    let data = [
      `files${staticUrl}`, // 파일경로
      newfileName[0], // 파일 이름
      newfileName[1], // 확장자명
      1, // 배치순서
      "f2", // f1 공지사항, f2 리뷰, f3 1:1문의 value
      1 // 테이블 행 번호??
    ]
    fileValues.push(data);

  }
  // DB insert 첨부파일 정보를 DB에 저장
  await db.connection('file', 'fileInsert', [fileValues])
  .then((result) => {
    console.log(result);
  }).catch ((err) => {
    console.log(err);
  })
  res.send()
});

// 테스트 라우터
// fileRouter.post('/test', async (req, res) => {
//   let fileValues = [
//     ['files/images', 'test1', 'jpg', 1, 'f2', 1],
//     ['files/images', 'test1', 'jpge', 1, 'f1', 2],
//     ['files/images', 'test1', 'jpge', 1, 'f3', 3],
//     ['files/images', 'test1', 'jpge', 1, 'f1', 4],
//     ['files/images', 'test1', 'png', 1, 'f2', 5],
//   ];
//   let result = await db.connection('file', 'fileInsert', [fileValues]);
//   res.send(result);
// })





// 첨부파일 정보 전체조회
fileRouter.get('/', async (req, res) => {
  let result = await db.connection('file','fileList');
  res.send(result);
})

module.exports = fileRouter;