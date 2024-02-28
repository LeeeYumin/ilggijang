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

const userJoin =
`INSERT INTO user 
 SET ?`;

const userInfo = 
`select 
    id
    ,pw_no
    ,name
    ,birth_date
    ,addr
    ,detail_addr
    ,mail,phone
    ,login_type_code
    ,age_code 
FROM user
WHERE user_no = ? `;

userLogin = 
`SELECT 
        user_no
        ,name
        ,birth_date
        ,addr,detail_addr
        ,mail,phone
        ,age_code
        ,gender_code
        ,join_date
        ,login_type_code
FROM user
WHERE id = ? AND pw_no = ?`;

module.exports = {
    userList,
    userJoin,
    userInfo,
    userLogin
  }