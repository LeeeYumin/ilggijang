// 도서 상세 리뷰 목록
const detailReviewList = 
`SELECT RPAD(SUBSTR(u.id, 1, 2), LENGTH(u.id), '*') AS writer
        , r.content
        , (SELECT COUNT(*) FROM likes WHERE review_no = r.review_no) AS likes
        , DATE_FORMAT(r.write_date, '%Y-%m-%d') AS write_date
        , r.grade
        , r.review_no
FROM review r 
JOIN user u
ON (u.user_no = r.user_no)
JOIN prdt p
ON (p.prdt_no = r.prdt_no)
WHERE p.prdt_no = ?
ORDER BY ?, r.write_date DESC
LIMIT ?, 10`; // 상품 번호, 정렬번호(3~5), 페이지 값 필요
const detailReviewCnt =
`SELECT count(*) AS pcnt
FROM review r 
JOIN user u
ON (u.user_no = r.user_no)
JOIN prdt p
ON (p.prdt_no = r.prdt_no)
WHERE p.prdt_no = ?`; // 상품 번호 필요

// 도서 상세 내 리뷰 목록
const detailMyReviewList =
`SELECT u.id
        , r.content
        , (SELECT COUNT(*) FROM likes WHERE review_no = r.review_no) AS likes
        , DATE_FORMAT(r.write_date, '%Y-%m-%d') AS write_date
        , r.grade
        , r.review_no
FROM review r
JOIN user u
ON (u.user_no = r.user_no)
JOIN prdt p
ON (p.prdt_no = r.prdt_no)
WHERE u.user_no = ? AND p.prdt_no = ?
ORDER BY r.write_date DESC`; // 회원 번호, 상품 번호 필요. 최신 순 정렬

// 관리자 리뷰 목록
const adminReviewList =
`SELECT r.review_no
        , DATE_FORMAT(r.write_date, '%Y-%m-%d') AS write_date
        , p.prdt_no
        , p.book_name
        , u.id
        , u.name
        , RPAD(SUBSTR(r.content, 1, 8), CHAR_LENGTH(SUBSTR(r.content, 1, 10)), '.') AS litecont
        , r.grade
FROM review r 
JOIN user u
ON (u.user_no = r.user_no)
JOIN prdt p
ON (p.prdt_no = r.prdt_no)
ORDER BY r.write_date DESC`; // 최신 순 정렬

// 리뷰 등록
const reviewInsert = 
`INSERT INTO review
SET ? `;

// 리뷰 수정
const reviewUpdate = 
`UPDATE review
SET ?
WHERE review_no = ? `;

// 리뷰 삭제
const reviewDelete = 
`DELETE FROM review
WHERE review_no = ? `;

// 좋아요 추가 삭제
const likeInsert = 
`INSERT INTO likes
SET ? `;
const likeCheck = // DB체크
`SELECT *
FROM likes
WHERE user_no = ? AND review_no = ? `;
const likeDelete =
`DELETE FROM likes
WHERE user_no = ? AND review_no = ? `;

// 좋아요 수
const likeCnt =
`SELECT COUNT(*) AS lcnt
FROM likes
WHERE review_no = ? `;

module.exports = {
    detailReviewList, detailReviewCnt
    , detailMyReviewList
    , adminReviewList
    , reviewInsert
    , reviewUpdate
    , reviewDelete
    , likeCheck, likeInsert, likeDelete, likeCnt
}