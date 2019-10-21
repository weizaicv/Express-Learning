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
    //user关联了product 自定义了很多方法
    req.user.createProduct({
        title:title,
        price:price,
        imgUrl:imgUrl,
        description:description,
    }).then((result)=>{
        console.log("success add")
        res.redirect('/admin/products');
    })
    // Product.create({
    //     title:title,
    //     price:price,
    //     imgUrl:imgUrl,
    //     description:description,
    //     userId:req.user.id
    // }).then((res)=>{
    //     console.log("success add")
    // }).catch((err)=>{
    //     console.log(err);
    // })
}

exports.postEditProduct = (req, res, next) => {
    const {title,imgUrl,price,description,id} = req.body;
    Product.findByPk(id).then(product=>{
        return product.update({title,imgUrl,price,description})
    })
    res.redirect('/admin/products');
}

exports.getEditProduct = (req, res, next) => {
    const id = req.params.productId;
    req.user.getProducts({where:{id:id}}).then(products=>{
        const product = products[0];
        res.render('admin/edit-product',{
            editing:true,
            product:product,
            pageTitle:'编辑页面',
            path:'admin/products'
        })
    })
    // Product.findByPk(id).then(product=>{
    //     res.render('admin/edit-product',{
    //         editing:true,
    //         product:product,
    //         pageTitle:'编辑页面',
    //         path:'admin/products'
    //     })
    // });
}

exports.getProducts = (req, res, next) => {
    // Product.findAll().then(products => {
    req.user.getProducts().then(products => {
        res.render('admin/products',{
            prods:products,
            pageTitle:'管理商品',
            path:"admin/products"
        });
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    Product.destroy({
		where:{
            id:id
        }
    }).then(()=>{
        console.log("删除成功")
    })
    res.redirect('/admin/products');
}