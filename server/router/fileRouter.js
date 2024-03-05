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
fileRouter.post('/photos', upload.array('fileList'), (req, res) => {
  // ★ multer가 인식할 수 있도록 array('이름과') <input name="이름"> 이 같게 ★
  let imgUrlList = [];
  for(let file of req.files){
    let imgUrl = `${staticUrl}/${file.filename}`;
    imgUrlList.push(imgUrl);
  }
  res.send(imgUrlList); // 결과반환
});

// DB에 저장


module.exports = fileRouter;