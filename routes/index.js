var express = require('express');
var moment = require('moment');
var db = require('../db/database');

var router = express.Router();

router.get('*', function (req, res, next) {
    // 到注册页面不跳转
    if (req.url == '/register') {
        res.render('register', {
            title: '用户注册',
            name: req.cookies.name,
        });
        return;
    }
    if (req.url != '/login' && !req.cookies.name) {
        res.redirect('/login');
    }
    //console.log(req.cookies.name);
    next();
})

//登录
router.get('/login', function (req, res, next) {
    res.render('login', {
        name: req.cookies.name
    });
});

//用户注册
router.get('/register', function (req, res, next) {
    res.render('register', {
        name: req.cookies.name
    });
});

//主页 留言板
router.get('/', function (req, res, next) {
    if (req.cookies.name){
        res.render('index', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//查看留言
router.get('/message', function (req, res, next) {
    if (req.cookies.name) {
        res.render('message');
    }
    else {
        res.redirect('/login');
    }
})
 
//搜索留言
router.get('/search', function (req, res, next){
    if (req.cookies.name) {
        res.render('search');
    }
    else {
        res.redirect('/login');
    }
})

//个人信息
router.get('/info', function (req, res, next) {
    if (req.cookies.name) {
        res.render('info/info', {
            name: req.cookies.name
        })
    }
    else {
        res.redirect('/login');
    }
})

//添加个人信息
router.get('/info/add', function (req, res, next) {
    if (req.cookies.name){
        res.render('info/addinfo', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//修改个人信息
router.get('/info/update', function (req, res, next) {
    if (req.cookies.name){
        res.render('info/updateinfo', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//修改密码
router.get('/update', function (req, res, next) {
    if (req.cookies.name) {
        res.render('update', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//管理员页面
router.get('/admin', function (req, res, next) {
    if (req.cookies.name) {
        res.render('admin/admin', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//管理员查看信息
router.get('/adminMessage', function (req, res, next) {
    if (req.cookies.name) {
        res.render('admin/adminMessage', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

//管理员搜索
router.get('/adminSearch', function (req, res, next) {
    if (req.cookies.name) {
        res.render('admin/adminSearch', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})

/*管理员回复
router.get('/adminReply', function (req, res, next) {
    if (req.cookies.name) {
        res.render('admin/adminReply', {
            name: req.cookies.name
        });
    }
    else {
        res.redirect('/login');
    }
})
*/
module.exports = router;