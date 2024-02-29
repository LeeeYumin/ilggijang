// 관리자 1:1문의 목록
const adminQryList =
`SELECT q.qry_no
        , q.qry_date
        , q.qry_type
        , u.id
        , u.name
        , RPAD(SUBSTR(q.qry_content, 1, 8), CHAR_LENGTH(SUBSTR(q.qry_content, 1, 10)), '.') AS litecont
        , q.reply_state
        , q.reply_date
FROM qry q 
JOIN user u
ON (u.user_no = q.user_no)
ORDER BY q.qry_date DESC`;

// 문의 등록

// 문의 단건상세

// 문의 수정

// 문의 삭제 - 회원, 관리자 공통

module.exports = {
    adminQryList
}