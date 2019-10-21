const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Note = sequelize.define('note',{
    title: {
        type: Sequelize.CHAR(64),
        allowNull: false
    }
},
{ 
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步 
    tableName: 'note', 
    // timestamps: false 
}
)

module.exports = Note;
