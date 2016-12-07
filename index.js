var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser'); //引入body-parser，用于接收数据等
var port = process.env.PORT || 3000; //端口号
var app = express();
var jwt = require("jsonwebtoken"); //jsonwebtoken


app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port);
console.log('server is listing port ' + port);

//设置跨域访问
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回
    }
    else {
        next();
    }
});

var secretOrPrivateKey = "react";

// json webk token 使用分析
// express 开启跨域
// 登陆为例，
// 后端用户名和密码 验证成功以后，生成token playload载荷 + secretOrPrivateKey 密钥 + 过期时间
// 传回前端，前端存到sessionStorage或者localStorage中
// 当前端请求，需要权限的接口时，发送token到后端
// 后端验证token是否过期和非法，
// 验证成功，返回数据
// 验证失败，返回失败数据


app.get('/', function(req, res){
  console.log('1111111');
 // res.setHeader('Content-Type', 'application/json;charset=utf-8');
 // res.send(JSON.stringify(data.data.newslist, null, 4));
   

})

app.post('/get/userinfo', function(req, res){
    console.log('1111111');

    var tokenClient = req.body.token;
    console.log(tokenClient)
    jwt.verify(tokenClient, secretOrPrivateKey, function (err, decode) {

            if (err) {  //  时间失效的时候/ 伪造的token,返回错误信息给前端 
                console.log(err) 
                var data = {
                    "error": 1,
                    "success" : 0
                }        
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.send(JSON.stringify(data, null, 4));
            } else {
                // rq.decode = decode; 
                 var data = {
                    "error": 0,
                    "success" : 1,
                    "username" : 'react'
                };

                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.send(JSON.stringify(data, null, 4));
            }
    })
   

})

app.post('/login/', function(req, res){
  // 验证账号密码，需要查数据库
  // 验证token
  // var tokenClient = req.body.token;
  // jwt.verify(tokenClient, secretOrPrivateKey, function (err, decode) {
  //           if (err) {  //  时间失效的时候/ 伪造的token,返回错误信息给前端  
  //              var data = {
  //                   "error": 1,
  //                   "success" : 0
  //              }        
  //               res.setHeader('Content-Type', 'application/json;charset=utf-8');
  //               res.send(JSON.stringify(data, null, 4));
  //           } else {
  //               // rq.decode = decode; 
  //               console.log(decode.msg);   // today  is  a  good  day
  //               // next();
  //           }
  // })

  if(req.body.username == 'react' && req.body.pwd == '12345'){
    console.log('登陆成功');
    var content = {"id" : 888};
    var token = jwt.sign(content, secretOrPrivateKey,{
        expiresIn: 120
    });

    var data = {
        "error" : 0,
        "success" : 1,
        "token" : token
    };

    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify(data, null, 4));
  }
  else{
    var data = {
        "error": 1,
        "success" : 0
    }   
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify(data, null, 4));
  }
   

})

// var content = {msg : "this is test"};
// var token = jwt.sign(content, secretOrPrivateKey,{
//     expiresIn: 60
// });

 // console.log("token: " + token);
// var token = rq.body.token || rq.query.token || rq.headers["x-access-token"]; // 从body或query或者header中获取token
// var token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyHRlc3QiLCJpYXQiOjE0ODA5MjUwNzEsImV4cCI6MTQ4MDkyNTEzMX0.M3DsLm5J8yt4BjroVKxB-TxFRROwQjPtXVsgr9ldq5M'
// jwt.verify(token1, secretOrPrivateKey, function (err, decode) {
//             if (err) {  //  时间失效的时候/ 伪造的token          
//                console.log(err)
//             } else {
//                 // rq.decode = decode; 
//                 console.log(decode.msg);   // today  is  a  good  day
//                 // next();
//             }
//         })