var moment = require('moment');
var express = require('express');
var db = require('../db/database');

var router = express.Router();

//用户注册

router.post('/adduser', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //console.log(req.body);
    if (username == '' || password == '') {
        res.json({
            'msg': '账号密码不能为空',
            'code': '300'
        });
        return;
    }

    db.get_user([`${username}`]).then(results => {
        console.log(results);
        if (results.length > 0) {
            res.json({
                'msg': '此用户已注册，快去登录吧',
                'code': '100'
            });
        }
        else {
            db.add_user([`${username}`, `${password}`]).then(results => {
                if (results.affectedRows > 0) {
                    res.json({
                        'msg': '注册成功，快去登录吧',
                        'code': '200'
                    });
                }
                else {
                    //console.log('asdas');
                    res.json(results);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    })
})

//用户登录

router.post('/userLogin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
        res.json({
            'msg': '账号密码不能为空',
            'code': '300'
        });
        return;
    }

    db.user_login([`${username}`, `${password}`]).then(results => {
        //console.log(results);
        if (results.length > 0) {
            res.cookie('name', username/*, { expires: new Date(Date.now() + 600000) }*/);
            res.json({
                'msg': '登录成功',
                'code': '200'
            })
        }
        else {
            res.json({
                'msg': '账号密码错误',
                'code': '100'
            })
        }
    })
})

//管理员登录
router.post('/adminLogin', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);
    if (username == '' || password == '') {
        res.json({
            'msg': '账号密码不能为空',
            'code': '300'
        });
        return;
    }
    db.admin_login([`${username}`, `${password}`]).then(results => {
        console.log(results);
        if (results.length > 0) {
            res.cookie('name', username, { expires: new Date(Date.now() + 6000000) });
            res.json({
                'msg': '管理员登录成功',
                'code': '200'
            })
        }
        else {
            res.json({
                'msg': '账号密码错误',
                'code': '100'
            })
        }
    })
})

//发表留言
router.post('/addMessage', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    var username = req.cookies.name;
    console.log(req.body);
    console.log(date);
    db.add_message([`${title}`, `${content}`, `${date}`,`${username}`]).then(results => {
        //console.log(results);
        if (results.affectedRows > 0) {
            res.json({
                'msg': '发表留言成功'
            })
        }
        else {
            res.json({
                'msg': '发表留言失败，请检查留言要求'
            })
        }
    })

})

//显示的留言条数
router.get('/showNum', function (req, res) {
    db.show_num().then(results => {
        var num = results[0].num;
        //console.log(num);
        res.json({
            num: num
        })
    })
})

//显示留言
router.get('/showMessage', function (req, res) {
    var username = req.cookies.name;
    var page = req.query.page || 1;
    //console.log(page);
    db.show_message([(page - 1) * 8, page * 8]).then(results => {
        //console.log(results);
        res.json({
            results: results,
            username: username
        })
    })
})

//查询的留言个数
router.get('/searchNum', function (req, res) {
    var search = `%${req.query.search}%`;
    db.search_num([`${search}`]).then(results => {
        var num = results[0].num;
        //console.log(num);
        res.json({
            num: num
        })
    }) 
})

//查询留言
router.get('/searchMessage', function (req, res) {
    var search = `%${req.query.search}%`;
    var username = req.cookies.name;
    var page = req.query.page || 1;
    console.log(req.query);

    db.search_message([`${search}`, (page - 1) * 8, page * 8]).then(results => {
        //console.log(results);
        res.json({
            results: results,
            username: username
        })
    })
})

//检测是否存在个人信息
router.post('/getInfo', function (req, res) {
    var username = req.cookies.name;
    //console.log(username);
    db.get_info([`${username}`]).then(results => {
        console.log(results[0].username);
        if (results.length > 0) {
            res.json({
                'code': '200'
            })
        }
        else {
            res.json({
                'code': '100'
            })
        }
    })
})

//显示个人信息
router.post('/showInfo', function (req, res) {
    var username = req.cookies.name;
    //console.log(username);
    db.get_info([`${username}`]).then(results => {
        //console.log(results);
        res.json({
            results: results[0]
        })
    })
})

//添加个人信息
router.post('/addInfo', function (req, res) {
    var username = req.cookies.name;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var info = req.body.info;
    //console.log(req.body);
    db.add_info([`${username}`, `${name}`, `${email}`, `${phone}`, `${info}`]).then(results => {
        //console.log(results);
        if (results.affectedRows > 0) {
            res.json({
                'msg': '添加个人信息成功'
            })
        }
        else {
            res.json({
                'msg': '添加个人信息失败'
            })
        }
    })
})

//修改个人信息
router.post('/updateInfo', function (req, res) {
    var username = req.cookies.name;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var info = req.body.info;
    //console.log(req.body);
    db.update_info([`${name}`, `${email}`, `${phone}`, `${info}`, `${username}`]).then(results => {
        //console.log(results);
        if (results.affectedRows > 0) {
            res.json({
                'msg': '修改个人信息成功'
            })
        }
        else {
            res.json({
                'msg': '修改个人信息失败'
            })
        }
    })
})

//修改密码
router.post('/updatePassword', function (req, res) {
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
    var username = req.cookies.name;
    console.log(req.body);
    db.update_password([`${new_password}`, `${username}`]).then(results => {
        console.log(results);
        if (results.affectedRows > 0) {
            res.json({
                'msg': '修改密码成功，请重新登录'
            })
        }
        else {
            res.json({
                'msg': '修改密码失败'
            })
        }
    })
})

//管理员回复消息
router.post('/adminReply', function (req, res) {
    var date = req.body.date;
    var reply = req.body.reply;
    
    db.admin_replay([`${reply}`, `${date}`]).then(results => {
        console.log(results);
        res.cookie()
        if (results.affectedRows > 0) {
            res.json({
                'msg': '回复成功'
            })
        }
        else {
            res.json({
                'msg': '回复失败'
            })
        }
    })
})

//管理员删除消息
router.post('/adminDelete', function (req, res) {
    var date = req.body.date;

    db.admin_delete([`${date}`]).then(results => {
        console.log(results);
        if (results.affectedRows > 0) {
            res.json({
                'msg': '删除成功'
            })
        }
        else {
            res.json({
                'msg': '删除失败'
            })
        }
    })
})

//退出
router.get('/exit', function (req, res) {
    res.clearCookie('name');
    res.redirect('/login');
});
//其余以后再加

module.exports = router;