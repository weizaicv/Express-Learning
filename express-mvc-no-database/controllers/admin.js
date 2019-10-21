const Product = require('../models/product')

exports.getAddProduct = (req,res,next)=>{
	res.render('admin/add-product',{
        pageTitle:'添加商品',
        path:'/admin/add-product',
        productCss:true,
        formsCss:true,
        isAddProductActive:true
    });
}

exports.postAddProduct = (req, res, next) => {
    const {title,imgUrl,price,description} = req.body;
    const product = new Product(title,imgUrl,price,description,null);
    product.save();
    res.redirect('/');
}

exports.postEditProduct = (req, res, next) => {
    const {title,imgUrl,price,description,id} = req.body;
    const updateProduct = new Product(title,imgUrl,price,description,id);
    updateProduct.save();
    res.redirect('/admin/products');
}

exports.getEditProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id,product=>{
        res.render('admin/edit-product',{
            editing:true,
            product:product,
            pageTitle:'编辑页面',
            path:'admin/products'
        })
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log('products',products)
        res.render('admin/products',{
            prods:products,
            pageTitle:'管理商品',
            path:"admin/products"
        });
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    Product.deleteById(id);
    res.redirect('/admin/products');
}