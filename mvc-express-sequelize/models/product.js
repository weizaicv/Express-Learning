const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//模型名称 模型字段
const Product = sequelize.define('product',{
    //定义模型结构
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER
    }
})

module.exports = Product
