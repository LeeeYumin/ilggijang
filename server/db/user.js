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

userJoin =
`INSERT INTO user(
            id,
            pw_no,
            name,
            birth_date,
            addr,
            detail_daar,
            mail,
            phone,
            age_code)
VALUES(?)`;

module.exports = {
    userList,
    userJoin
  }