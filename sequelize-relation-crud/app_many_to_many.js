const express = require('express');
const app = express();
const sequelize = require('./utils/database.js');
const Sequelize = require('sequelize');
const User = require('./models/user');
const Project = require('./models/project');
const UserProject = require('./models/userproject');

//User 模型（函数被调用的模型）是 source 。 
//Project 模型（作为参数传递的模型）是 target

//-------------多对多--------------
//belongsToMany 
User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });
//User增加方法：getProjects、setProjects、addProject、addProjects、createProject、removeProject、hasProject
//Project增加方法：getUsers、setUsers、addUser、addUsers、createUser、removeUser、hasUser


sequelize
.sync({force: true})
.then(async () => {
   
    //-------------多对多--------------

    //关系操作：新增方式1 async await
    //关系表本身需要的属性，通过传递一个额外的对象给设置方法来实现。
    // const user = await User.create({empId:1,name:'weizai'});
    // await user.createProject({pname:'project1'},{through:{type:'type1'}});
    //关系操作：新增方式2
    // const user = await User.create({empId:1,name:'weizai'});
    // const project = await Project.create({pname:'title'});
    // user.addProject(project,{through:{type:'type1'}});
    // const user = await User.create({empId:1,name:"weizai"});
    // const project1 = await Project.create({pname:'p1'});
    // const project2 = await Project.create({pname:'p2'});
    // await user.addProjects([project1,project2],{through:{type:'user1 de'}});


    //关系操作: 修改
    //会查询userId=1的所有note，并且切断外链关系；重新将userId=1外链给到note3,note4
    // const user = await User.create({empId:1,name:'weizai'});
    // const project1 = await Project.create({pname:'p1'});
    // const project2 = await Project.create({pname:'p2'});
    // await user.addProjects([project1,project2],{through:{type:'modify user'}});

    // const project3 = await Project.create({pname:'p3'})
    // const project4 = await Project.create({pname:'p4'})
    // await user.setProjects([project3,project4],{through:{type:'modify user twice'}})


    //关系操作：删除 删除userId关联记录
    // const user = await User.create({empId:1,name:'weizai'});
    // const project1 = await user.createProject({pname:'project1'});
    // const project2 = await user.createProject({pname:'project2'});
    // await user.addProjects([project1,project2], {through:{type:'delete'}})
    // await user.removeProject(project1);
    // await user.setProjects([]); //全部删除


    //关系操作查询
    // const Op = Sequelize.Op;
    // const user = await User.create({empId:1});
    // const user2 = await User.create({empId:2});
    // const user3 = await User.create({empId:3});
    // const note1 = await user.createNote({title:"this is node1 note"});
    // const note2 = await user.createNote({title:"this is node2 note"});
    // const note3 = await user.createNote({title:"this is node3 note"});
    // const note4 = await user.createNote({title:"this is common note"});

    // 查询所有满足条件的 note，同时获取 note 所属的 user：
    // const oneuser = await User.findOne({empId:1});
    // const notes = await oneuser.getNotes({ // (2)
    //     where: {
    //       title: {
    //         [Op.like]: '%node%'
    //       }
    //     }
    //   });
    // console.log(`User ${oneuser.empId}: has ${notes.length} node notes`)

    //查询所有满足条件的 user，同时获取该 user 所有满足条件的 note：
    // const users = await User.findAll({
    //     include:[Note],
    //     where:{
    //         createdAt:{
    //             [Op.lt]: "2019-10-13"
    //         }
    //     }
    // })
    // const users = await User.findAll({
    //     include:[{
    //         model:Note,
    //         where:{
    //             title:{
    //                 [Op.like]:'%node%'
    //             }
    //         }
    //     }],
    //     where:{
    //         createdAt:{
    //             [Op.lt]: "2019-10-13"
    //         }
    //     }
    // })
    // console.log(`User ${users.length}`)


    console.log(`Database & tables created!`);
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});