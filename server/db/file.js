// 첨부파일 전체조회
const fileList = 
`SELECT 	file_no
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
`SELECT 	r.*
        , f.*
        FROM review r
        JOIN file f
        ON r.review_no = f.table_row_no
WHERE r.prdt_no = ?`;




module.exports = {
  fileList,
  fileInsert,
  reviewFileList
}