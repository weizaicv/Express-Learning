const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
const Cart = require('./cart');


const getProductsFromFile = (cb) => {
    fs.readFile(p,(err,fileContent)=>{
        if(err || fileContent == ''){
            return cb([])
        }
        cb(JSON.parse(fileContent));
    })
}

module.exports = class Product{
    constructor(title,imgUrl,price,description,id){
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
        this.id = id; 
    }

    save(){
        //保存or编辑
        getProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex = products.findIndex(p=>this.id==p.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err)
                })
            }else{
                //存储到本地文件
                this.id = parseInt((Math.random()*1000)).toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err)
                })
            }
        })
    }

    //静态方法 类就可以使用不需要new
    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    //得到商品详情
    static findById(id, cb){
        getProductsFromFile(products=>{
            const product = products.find(p=>p.id == id);
            cb(product)
        })
    }
    //商品管理删除
    static deleteById(id){
        getProductsFromFile(products=>{
            const product = products.find(prod => prod.id == id);
            const updatedProducts = products.filter(p=>p.id!=id);
            fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
                if(!err){
                    Cart.deleteById(id,product.price)
                }
            })
        })
    }

    //商品修改信息

}