const Sequelize = require('sequelize');
const sequelize = new Sequelize('relations','root','weizai',{
    dialect:"mysql",
    host:"localhost"
})
module.exports = sequelize;