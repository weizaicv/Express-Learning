const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'所有商品',
            path:"/products"
        });
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    console.log('prodId',prodId)
    Product.findById(prodId,product => {
        res.render('shop/product-detail',{
            product:product,
            pageTitle:'商品详情',
            path:'/products',
        });
    });
}



exports.getCart = (req, res, next) => {
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(p=>p.id==product.id);
                if(cartProductData){
                    cartProducts.push({productData:product,quality:cartProductData.quality});
                }
            }
            console.log(cartProducts)
            res.render('shop/cart',{
                totalPrice:cart.totalPrice,
                products: cartProducts,
                path:'/cart',
                pageTitle:'我的购物车'
            })
        })
       
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId,product=>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId,product=>{
        Cart.deleteById(prodId,product.price);
        res.redirect('/cart');
    })
}


exports.getOrders = (req, res, next) => {
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'我的订单'
    })
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:'结算页面'
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index',{
            prods:products,
            pageTitle:'商品首页',
            path:"/"
        });
    })
}