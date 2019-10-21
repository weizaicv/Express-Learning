const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//模型名称 模型字段
const Order = sequelize.define('order',{
    //定义模型结构
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
})

module.exports = Order
