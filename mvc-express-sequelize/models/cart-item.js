const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//模型名称 模型字段
const CartItem = sequelize.define('cartItem',{
    //定义模型结构
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:Sequelize.INTEGER,
})

module.exports = CartItem
