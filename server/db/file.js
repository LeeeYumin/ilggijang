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




module.exports = {
  fileList,
  fileInsert
}