// 安装nodemon
// express 中间件
// app.use((req,res,next)=>{})
// 静态文件访问
const path = require('path');
const express = require('express');
//解析body中间件
const bodyParser = require('body-parser');

const app = express();

const db = require('./utils/database');

//配置项
// 模板 pub handlebar ejs
// app.set('view engine','pug');
// app.set('views','views');
app.set('view engine','ejs');
app.set('views','views');

//express route文件夹 路由设置
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('select * from products').then(res=>{
	console.log(res);
}).catch(err=>{console.log(err)})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
//路径带有admin
app.use('/admin',adminRoutes);
app.use(shopRoutes);



app.use((req,res,next)=>{
	// res.status('404').send('<h1>not found!</h1>');
	// res.status(404).sendFile(path.join(__dirname,'views','404.html'));
	res.status(404).render('404',{pageTitle:'myshop',error:'this is 404'});
})


app.listen(3000)