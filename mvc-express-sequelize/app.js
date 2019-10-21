const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./utils/database');

//配置项
// 模板 pub handlebar ejs
app.set('view engine','ejs');
app.set('views','views');


//express route文件夹 路由设置
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

//模型
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
//将user挂载到req上
app.use((req, res, next)=>{
	User.findByPk(1).then(user=>{
		req.user = user;
		next();//进入下一个中间件
	}).catch(err=>{
		console.log(err);
	})
})
//路径带有admin
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use((req,res,next)=>{
	res.status(404).render('404',{pageTitle:'myshop',error:'this is 404'});
})


// Player.belongsTo(Team) // `teamId` 将被添加到 Player / Source 模型中
// Coach.hasOne(Team) // `coachId` 将被添加到 Team / Target 模型中

//管理员添加得商品
//belongsTo主键加source    source target
//hasOne主键加target
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});//product加外键userId

//user
//User的实例对象将拥有getCart、setCart、createCart方法
//Cart的实例对象将拥有getUser、setUser、createUser方法
Cart.belongsTo(User);//Cart加外键 UserId
User.hasOne(Cart);


Order.belongsTo(User);//Order加外键 UserId

//cart和product多对多
//CartItem 有CartId ProductId
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
// 这将添加方法 getProducts, setProducts, addProduct,addProducts 到 Cart, 
// 还有        getCarts, setCarts, addCart, 和 addCarts 到 Product.

User.hasMany(Product); 
User.hasMany(Order);

//添加方法 getProducts, setProducts, addProduct,addProducts 到 Order
Order.belongsToMany(Product,{through:OrderItem})

app.listen(3300);

// sequelize.sync({force:true})
// .then(result=>{
// 	return User.findByPk(1)
// })
// .then(user=>{
// 	if(!user){
// 		return User.create({name:'hamo',email:'hamo@qq.com'})
// 	}
// 	return user;
// })
// .then(user=>{
// 	console.log(user);
// 	app.listen(3300);
// })

