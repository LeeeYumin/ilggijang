// 리뷰 목록
const reviewList = 
`select rpad(substr(u.id, 1, 2), length(u.id), '*') as writer
, r.write_date
, r.content
, r.grade
from review r 
join user u
on (u.user_no = r.user_no)
join prdt p
on (p.prdt_no = r.prdt_no)
order by write_date desc;`;

// 리뷰 단건

// 리뷰 등록
const reviewInsert = 
`insert into review
set ? `;

// 리뷰 수정
const reviewUpdate = 
`update review
set ?
where review_no = ? `;

// 리뷰 삭제
const reviewDelete = 
`delete from review
where review_no = ? `;

// 좋아요
const reviewLikes =
`select`;
module.exports = {
    reviewList
    , reviewInsert
    , reviewUpdate
    , reviewDelete
    , reviewLikes
}