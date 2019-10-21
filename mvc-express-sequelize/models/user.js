const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//模型名称 模型字段
const User = sequelize.define('user',{
    //定义模型结构
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
})

module.exports = User
