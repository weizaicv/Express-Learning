const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user',{
    empId:{
        type:Sequelize.STRING,
        allowFull:false,
        unique:true
    },
    name:{
        type:Sequelize.STRING,
    }
},
{ 
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步 
    tableName: 'user', 
    // timestamps: false 
}
)

module.exports = User;