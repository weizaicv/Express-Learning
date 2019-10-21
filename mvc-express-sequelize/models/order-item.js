const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//模型名称 模型字段
const OrderItem = sequelize.define('orderItem',{
    //定义模型结构
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
})

module.exports = OrderItem
