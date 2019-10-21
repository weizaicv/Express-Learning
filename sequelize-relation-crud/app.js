const express = require('express');
const app = express();
const sequelize = require('./utils/database.js');
const Sequelize = require('sequelize');
const User = require('./models/user');
const Note = require('./models/note');


//-------------一对多--------------
User.hasMany(Note);
Note.belongsTo(User);
//User增加方法：getNotes、setNotes、addNote、createNote、removeNote、hasNote
//Note增加方法：getUser setUser createUser





sequelize
.sync({force: true})
.then(async () => {
   
    //-------------一对多--------------

    //关系操作：新增方式1 async await
    // const user = await User.create({empId:1});
    // const note = await user.createNote({title:'111'})
    //关系操作：新增方式2
    // const user = await User.create({empId:1});
    // const note = await Note.create({title:'title'});
    // user.addNote(note);

    //关系操作: 修改
    //会查询userId=1的所有note，并且切断外链关系；重新将userId=1外链给到note3,note4
    // const user = await User.create({empId:1});
    // const note1 = await user.createNote({title:'title1'});
    // const note2 = await user.createNote({title:'title2'});

    // const note3 = await Note.create({title:'title3'})
    // const note4 = await Note.create({title:'title4'})
    // await user.setNotes([note3,note4])

    // const user = await User.create({empId:1});
    // const note = await user.createNote({title:'test1'});
    // //创建id=2的user,当前note更新外键为当前id=2
    // await note.createUser({empId:2});

    //关系操作：删除 删除userId关联记录
    // const user = await User.create({empId:1});
    // const note1 = await user.createNote({title:'note1'});
    // const note2 = await user.createNote({title:'note2'});
    // await user.setNotes([]);

    //关系操作：删除note指定记录
    // const user = await User.create({empId:1});
    // const note1 = await user.createNote({title:'note1'});
    // const note2 = await user.createNote({title:'note2'});
    // // await note2.destroy(); //删除记录
    // await user.removeNote(note1); //删除外链

    //关系操作查询
    const Op = Sequelize.Op;
    const user = await User.create({empId:1});
    const user2 = await User.create({empId:2});
    const user3 = await User.create({empId:3});
    const note1 = await user.createNote({title:"this is node1 note"});
    const note2 = await user.createNote({title:"this is node2 note"});
    const note3 = await user.createNote({title:"this is node3 note"});
    const note4 = await user.createNote({title:"this is common note"});

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
    const users = await User.findAll({
        include:[{
            model:Note,
            where:{
                title:{
                    [Op.like]:'%node%'
                }
            }
        }],
        where:{
            createdAt:{
                [Op.lt]: "2019-10-13"
            }
        }
    })
    console.log(`User ${users.length}`)


    console.log(`Database & tables created!`);
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});