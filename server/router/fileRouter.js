const express =  require('express');
const fileRouter = express.Router();
const db = require("../db.js");
const multer = require('multer');
const fs = require('fs');
var url = require('url');


// 폴더경로 만들기
let dir = 'C:/ilggijang-project/images/'; // ★ 경로확실히 -> 화면쪽 메소드에 new URL()
// let dir = 'C:/ilggijang-project/images/'; // public/product에 저장

// 함수
const storage = multer.diskStorage({ // 디스크 저장소 정의
  destination : function(req, file, cb) {
    
    // 폴더 없으면 폴더 생성
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });

      cb(null, dir); // 콜백함수를 통해 전송된 파일 저장 디렉터리 설정
    } else {
      cb(null, dir)
    }
  },

  filename : function(req, file, cb) { // file : 넘어온 파일에 대한 정보가 있음
    // 한글 파일명 깨짐 해결
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    // let rename = (new Date()).getMilliseconds() + file.originalname;
    cb(null, file.originalname); // 밀리초+파일이름으로 파일이름 재설정(파일 이름 충돌방지)
  }
});

// 제한
const limits = {
  fieldNameSize: 200, //필드명 사이즈 최대값
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 3, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 5, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

//확장자 필터
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(null, false);
  }
};

// multer 객체생성
const upload = multer({
  storage: storage,  //이미지 업로드
  limits: limits,     //업로드 제한
  fileFilter: fileFilter,   //파일 제한
}); 


// const staticUrl = '/images';
// fileRouter.use(staticUrl, express.static('files')); // 서버에 파일저장

// 멀티 파일 받아서 file DB에 저장
fileRouter.post('/uploading', upload.array('fileList'), async (req, res) => {
  // 다음에 생성될 상품번호 조회
  let result = await db.connection('file', 'nextPrdtNo');
  let pno = result[0].next_pno;

  console.log(pno, '================!!!!');

  let fileValues = [];
  for(let file of req.files){
    
    let newfileName = file.filename.split('.'); // 문자열 잘라서 파일명만 담기
    //console.log('파일명과 확장자 분리하기', newfileName[0], newfileName[1]);

    let data = [
      dir, // 파일경로
      newfileName[0], // 파일 이름
      newfileName[1], // 확장자명
      1, // 배치순서
      "f4", // f1 공지사항, f2 리뷰, f3 1:1문의 f4 상품
      pno // 상품번호
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


// 첨부파일 정보 전체조회(관리자용)
fileRouter.get('/', async (req, res) => {
  let result = await db.connection('file','fileList');
  res.send(result);
})


// 첨부파일 다운로드 (테스트-리뷰)
fileRouter.get('/download', async (req, res) => {
  // 쿼리스트링 조건
  let queryStr = url.parse(req.url, true).query;
  let pno = queryStr.pno;
  
  let result = await db.connection('file','reviewFileList', pno);
  // console.log('결과', result);
  let path =  "C:/Users/admin/Pictures/ilggijang/images/"; // DB에서 불러오기
  let filename = [];
  result.forEach((ele, idx) => {
    // console.log(idx + '번 , ' + ele.file_name);
    filename.push(ele.file_name);
  });
  console.log(path+filename[0]+'.jpg')
  fs.createReadStream(path+filename[0]+'.jpg').pipe(res);
  // res.send(result);
})

// 다음에 생성될 상품번호 조회 (데스트용)
fileRouter.get('/next/prdtno', async (req, res) => {
  let result = await db.connection('file', 'nextPrdtNo');
  res.send(result[0].next_pno);
})

module.exports = fileRouter;