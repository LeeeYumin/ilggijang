// 도서 상세 QnA 목록
const detailQnaList =
`SELECT q.reply_state
		, RPAD(SUBSTR(q.qry_content, 1, 30), CHAR_LENGTH(SUBSTR(q.qry_content, 1, 32)), '.') AS litecont
        , DATE_FORMAT(q.write_date, '%Y-%m-%d') AS write_date
        , RPAD(SUBSTR(u.id, 1, 2), CHAR_LENGTH(u.id), '*') AS writer
FROM qna q
JOIN user u
ON (u.user_no = q.user_no)
WHERE prdt_no = ?
ORDER BY q.write_date DESC
LIMIT ?, 5`; // 상품 번호, 페이지 값 필요
const detailQnaCnt =
`SELECT count(*) AS qacnt
FROM qna
WHERE prdt_no = ?`; // 상품 번호 필요


// 도서 상세 내 QnA 목록
const detailMyQnaList =
`SELECT q.reply_state
		, RPAD(SUBSTR(q.qry_content, 1, 30), CHAR_LENGTH(SUBSTR(q.qry_content, 1, 32)), '.') AS litecont
        , DATE_FORMAT(q.write_date, '%Y-%m-%d') AS write_date
FROM qna q
WHERE user_no = ? AND prdt_no = ?
ORDER BY q.write_date DESC`; // 회원 번호, 상품 번호 필요

// 관리자 QnA 목록
const adminQnaList =
`SELECT q.qna_no
        , q.write_date
        , p.prdt_no
        , p.book_name
        , u.id
        , u.name
        , RPAD(SUBSTR(q.qry_content, 1, 8), CHAR_LENGTH(SUBSTR(q.qry_content, 1, 10)), '.') AS litecont
        , q.reply_state
        , q.reply_content
FROM qna q
JOIN user u
ON (u.user_no = q.user_no)
JOIN prdt p
ON (p.prdt_no = q.prdt_no)
ORDER BY q.write_date DESC`; // 최신 순 정렬. 조회시 화면 표시를 위해 문의 내용, 답변 내용 들고옴

// QnA 등록
const qnaInsert =
`INSERT INTO qna
SET ? `;

// QnA 단건상세 - 답변 완료시 조회 가능
const qnaInfo =
`SELECT qry_content
, reply_content
FROM qna
WHERE qna_no = ? `;

// QnA 수정 - 관리자 답변이 이미 있으면 수정 불가. 회원, 관리자 공통. 관리자 답변등록 및 수정까지 같이 사용
const qnaUpdate =
`UPDATE qna
SET ?
WHERE qna_no = ? `;

// QnA 삭제 - 회원, 관리자 공통
const qnaDelete =
`DELETE FROM qna
WHERE qna_no = ? `;

module.exports = {
    detailQnaList, detailQnaCnt
    , detailMyQnaList
    , adminQnaList
    , qnaInfo
    , qnaInsert
    , qnaUpdate
    , qnaDelete
}