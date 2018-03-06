var mysql = require("mysql");

var pool = mysql.createPool({
    host    :'localhost',
    user    :'root',
    password:'123456',
    database:'message'
});

var query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    connection.release()
                })
            }
        })
    })
}

//注册查找用户是否存在
var get_user = function (values) {
    var sql = "SELECT * FROM user_id WHERE username = (?)";
    return query(sql, values);
}

//用户登录
var user_login = function (values) {
    var sql = "SELECT * FROM user_id WHERE (username,password) = (?,?)";
    return query(sql, values);
}

//新用户注册
var add_user = function (values) {
    var sql = "INSERT INTO user_id VALUES(?,?)";
    return query(sql, values);
}


//管理员登录
var admin_login = function (values) {
    var sql = "SELECT * FROM admin_id WHERE (username,password) = (?,?)";
    return query(sql, values);
}

//留言存入数据库
var add_message = function (values) {
    var sql = "INSERT INTO message VALUES(?,?,?,?,'无')";
    return query(sql, values);
}

//显示留言
var show_message = function (values) {
    var sql = "SELECT * FROM message ORDER BY date DESC LIMIT ?,?";
    return query(sql, values);
}

//显示留言总数
var show_num = function (values) {
    var sql = "SELECT COUNT(*) AS num from message";
    return query(sql, values);
}

//留言查询
var search_message = function (values) {
    var sql = "SELECT * FROM message WHERE content LIKE ? ORDER BY date DESC LIMIT ?,?";
    return query(sql, values);
}

//查询留言的个数
var search_num = function (values) {
    var sql = "SELECT COUNT(*) AS num FROM message WHERE content LIKE ?";
    return query(sql,values);
}

//查询个人信息是否存在
var get_info = function (values) {
    var sql = "SELECT * FROM info WHERE username = (?)";
    return query(sql, values);
}

//修改个人信息
var update_info = function (values) {
    var sql = "UPDATE info SET name=(?), email=(?), phone=(?),info=(?) where username=(?)";
    return query(sql, values);
}

//添加个人信息
var add_info = function (values) {
    var sql = "INSERT INTO info VALUES(?,?,?,?,?)";
    return query(sql, values);
}

//修改密码
var update_password = function (values) {
    var sql = "UPDATE user_id SET password=(?) WHERE username=(?)";
    return query(sql, values);
}

//管理员回复信息
var admin_replay = function (values) {
    var sql = "UPDATE message SET reply=? WHERE date=?";
    return query(sql, values);
}

//管理员删除信息
var admin_delete = function (values) {
    var sql = "DELETE FROM message WHERE date=?";
    return query(sql, values);
}

module.exports = {
    query,
    get_user,
    user_login,
    add_user,
    admin_login,
    add_message,
    show_message,
    show_num,
    search_message,
    search_num,
    get_info,
    update_info,
    add_info,
    update_password,
    admin_replay,
    admin_delete
    
}