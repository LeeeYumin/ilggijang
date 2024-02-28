// 회원등급 전체조회
const userRankList = 
`SELECT 	user_rank 
        , dc_rate 
        , user_rank_no
FROM userrank`;

// 회원등급을 조회할 일이 있을,,,까?


module.exports = {
  userRankList
}