// 첨부파일 전체조회
const fileList = 
`SELECT file_no
        , file_path
        , file_name
        , extension
        , seq
        , table_type_code
        , table_row_no
FROM file`;

// 첨부파일 등록
const fileInsert = 
`INSERT INTO file 
      (
      file_path
      , file_name
      , extension
      , seq
      , table_type_code
      , table_row_no
      )
VALUES ?`;

// 리뷰 이미지 조회
const reviewFileList = 
`SELECT r.*
        , f.*
        FROM review r
        JOIN file f
        ON r.review_no = f.table_row_no
WHERE r.prdt_no = ?`;

// 리뷰 이미지 조회
const prdtFileList = 
`SELECT r.*
        , f.*
        FROM review r
        JOIN file f
        ON r.review_no = f.table_row_no
WHERE r.prdt_no = ?`;

// 등록될 상품번호 조회
const nextPrdtNo = 
`SELECT CONCAT('BK', TO_CHAR(SYSDATE(), 'yyMMdd'), LPAD(NVL(MAX(SUBSTR(prdt_no, -3)), 0) + 1, 3, '0')) as next_pno
from prdt
WHERE SUBSTR(prdt_no, 3, 6) = TO_CHAR(SYSDATE(), 'yyMMdd')`;




module.exports = {
  fileList,
  fileInsert,
  reviewFileList,
  prdtFileList,
  nextPrdtNo
}