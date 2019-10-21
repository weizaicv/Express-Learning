const fs = require('fs');
const path = require('path');

const  p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
)
module.exports = class Cart{
    //1.获取之前的购物车
    static addProduct(id, productPrice){
        fs.readFile(p,(err,fileContent)=>{
        console.log('reading')

            let cart = {
                products:[],
                total:0
            }
            if(!err){
                cart = JSON.parse(fileContent)
            }

            //2.分析购物车/找到已存在的产品
            const existingProductIndex = cart.products.findIndex(prod => prod.id ==id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            //3.添加产品/增加产品的数量
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.quality = updatedProduct.quality + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id,quality:1};
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseFloat(productPrice);
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        })

    }   

    static deleteById(id, productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                return;
            }
            const updateCart = {...JSON.parse(fileContent)};
            console.log('updateCart',updateCart)
            const product = updateCart.products.find(p=>p.id==id);
            const productQuality = product.quality;
            updateCart.products = updateCart.products.filter(p=> p.id!=id);
            updateCart.totalPrice = updateCart.totalPrice - productQuality*productPrice;
            fs.writeFile(p,JSON.stringify(updateCart),err=>{
                console.log(err);
            })
        })
    }

    static getCart(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err || fileContent == ''){
                return cb([])
            }
            cb(JSON.parse(fileContent));
        })
    }
    
}