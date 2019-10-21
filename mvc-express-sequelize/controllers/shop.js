const Product = require('../models/product')
const Cart = require('../models/cart-item')

exports.getProducts = (req, res, next) => {
    // 数组解构默认值 [[],[]]  => [a,b]
    Product.findAll().then(products=>{
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'所有商品',
            path:"/products"
        });
    }).catch(err=>{
        console.log(err)
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.findAll({
        where:{id:prodId}
    }).then(products=>{
        res.render('shop/product-detail',{
            product:products[0],
            pageTitle:'商品详情',
            path:'/products',
        });   
    })
    // Product.findByPk(prodId).then(product=>{
    //     res.render('shop/product-detail',{
    //         product:product,
    //         pageTitle:'商品详情',
    //         path:'/products',
    //     });
    // })
   
}


exports.getCart = (req, res, next) => {
    req.user.getCart().then(cart=>{
        return cart.getProducts()
                   .then(products=>{
                        res.render('shop/cart',{
                            // totalPrice:cart.totalPrice,
                            products: products,
                            path:'/cart',
                            pageTitle:'我的购物车'
                        })
                   }) 
        
    })
    // Cart.getCart(cart=>{
    //     Product.fetchAll(products=>{
    //         const cartProducts = [];
    //         for(product of products){
    //             const cartProductData = cart.products.find(p=>p.id==product.id);
    //             if(cartProductData){
    //                 cartProducts.push({productData:product,quality:cartProductData.quality});
    //             }
    //         }
    //         res.render('shop/cart',{
    //             totalPrice:cart.totalPrice,
    //             products: cartProducts,
    //             path:'/cart',
    //             pageTitle:'我的购物车'
    //         })
    //     })
       
    // })
}

exports.postCart = (req, res, next) => {
    console.log(1111111111111111111)
    const prodId = req.body.productId;
    let fetchedCart;
    req.user
    .getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
        let product;
        if(products.length>0){
            product = products[0]
        }
        let newQuantity = 1;
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity+1;
        }
        return Product.findByPk(prodId)
        .then(product=>{
            fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
        })
    })
    .then(()=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .getCart()
    .then((cart)=>{
        return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err)
    })
}


exports.getOrders = (req, res, next) => {
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'我的订单'
    })
}


exports.postOrder = (req, res, next) =>{
    console.log(111111111111111111111111111111111)
    let fetchedCart;
    req.user
    .getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products=>{
        req.user
        .createOrder()
        .then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItem = { quantity:product.cartItem.quanlity};
                return product;
            }));
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(products);
    })
    .then(result=>{
        fetchedCart.setProducts(null);
        redirect("/orders");
    })
}

exports.getOrders = (req,res,next)=>{
    req.user
    .getOrders({include:['products']})
    .then(orders=>{
        res.render("shop/orders",{
            path:'/orders',
            pageTitle:'订单',
            orders:orders
        })
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:'结算页面'
    })
}

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products=>{
        res.render('shop/index',{
            prods:products,
            pageTitle:'所有商品',
            path:"/products"
        });
    }).catch(err=>{
        console.log(err)
    })
}