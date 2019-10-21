var sequelize = require('../utils/sequelizeDB');
//连接数据库 
var Sequelize = require('sequelize'); 
var User = sequelize.define('User', 
{ 
    user_id:
    { 
        type: Sequelize.STRING, 
        primaryKey: true
    }, 
    name: Sequelize.STRING, 
    phone: Sequelize.STRING, 
    create_date: Sequelize.DATE, 
    update_date: Sequelize.DATE 
}, 
{ 
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步 
    tableName: 'user', 
    timestamps: false 
}); 
//define函数的第一个参数’User’就是定义一个实体对象，名称不必与数据库表名一致，只是为了确定该对象没有重复
// { type: Sequelize.STRING, primaryKey: true } 将属性作为主键
// freezeTableName禁用修改表名; 
// 默认情况下, sequelize会自动将模型名称(第一个参数定义‘User’)为复数。
// 值为ture时不修改tableName数据库表名
// timestamps是否自动添加时间戳createAt，updateAt