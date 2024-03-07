//공지사항 리스트
const noticeList = 
`SELECT 
    notice_no
    ,title,content
    ,reg_date
    ,hit_cnt
    ,type
    ,fix_start_date
    ,fix_end_date
FROM notice`;

//공지사항 등록
const noticeInsert = 
`INSERT INTO notice
SET ?`;

//공지사항 수정
const noticeUpdate = 
`UPDATE notice
SET ?
WHERE notice_no = ?`;

//공지사항 단건 조회
const noticeInfo =
`select notice_no
       ,title
       ,content
       ,reg_date
       ,hit_cnt
       ,type
       ,fix_start_date
       ,fix_end_date
from notice`;



module.exports = {
    noticeList,
    noticeInsert,
    noticeUpdate,
    noticeInfo
}