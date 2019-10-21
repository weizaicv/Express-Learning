const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const UserProject = sequelize.define('userproject',{
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{ 
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步 
    tableName: 'userproject', 
}
)

module.exports = UserProject;