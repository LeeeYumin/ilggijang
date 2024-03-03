// 회원등급 전체조회
const userRankList = 
`SELECT 	user_rank 
        , dc_rate 
        , user_rank_no
FROM userrank`;

// 회원등급 단건조회
const userRankInfo = 
`SELECT 	r.user_rank 
          , r.dc_rate 
          , r.user_rank_no
          , u.user_no
FROM userrank r JOIN user u
                ON u.user_rank_no = r.user_rank_no
WHERE u.user_no = ?`;


module.exports = {
  userRankList,
  userRankInfo
}