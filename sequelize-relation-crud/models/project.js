const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Project = sequelize.define('project',{
    pname: Sequelize.STRING
},
{ 
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步 
    tableName: 'project', 
}
)

module.exports = Project;