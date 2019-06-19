var express = require('express'); 
var router = express.Router(); 
const jwt = require('jsonwebtoken');
const {  secretKey } = require('../constant/constant');

const jwtAuth=require('../middleware/jwt')

const tokenObj={
	
}



// 所有请求过来都会进行身份验证
router.use(jwtAuth);
// 路由中间件
router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  console.log('this is a api request!');
  // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
  next();
});



router.get('/test', function(req, res, next) { 
	res.send('respond with a resource'); 
}); 
router.get('/login', function(req, res, next) { 
	//模拟登陆成功
	// 用户登录成功过后生成token返给前端
  let token = jwt.sign(tokenObj, secretKey, {
        expiresIn : 60 * 60 * 24 // 授权时效24小时
  });
  res.json({
        success: true,
        message: 'success',
        token: token
  });

 
	// res.send('login'); 
}); 
module.exports = router;