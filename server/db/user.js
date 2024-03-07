//회원리스트
const userList = 
`SELECT 
    user_no ,
    id, 
    pw_no, 
    name,  
    birth_date,
    addr, 
    detail_addr,
    mail, 
    phone, 
    age_code, 
    gender_code,
    join_date,
    user_division_code, 
    login_type_code, 
    token, 
    user_rank_no
FROM user`;

//회원가입
const userJoin =
`INSERT INTO user 
 SET ?`;

 //회원상세정보
const userInfo = 
`select 
    id
    ,user_no
    ,pw_no
    ,name
    ,birth_date
    ,addr
    ,detail_addr
    ,mail
    ,phone
    ,login_type_code
    ,age_code 
FROM user
WHERE user_no = ? `;

//회원정보 수정
const userUpdate = 
`UPDATE user
SET ?
WHERE user_no = ?`;

module.exports = {
    userList,
    userJoin,
    userInfo,
    userUpdate
   
  }