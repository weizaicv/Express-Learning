const Sequelize = require('sequelize');

// 数据库 用户名 密码
const sequelize = new Sequelize('test','root','weizai',{
    dialect: "mysql",
    host:"localhost"
})
module.exports = sequelize;

