const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs') //filesystem
const { sortBy } = require('lodash')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
        if (err) {
            res.status(400).json({
                error : "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        //TODO: restriction on fields. Destructring
        const { name, description, price, category, stock } = fields
        if (!name ||
            !description ||
            !price ||
            !category ||
            !stock) {
            return res.status(400).json({
                error : "please include all fields"
            })
            
        }
        let product = new Product(fields)

        //handle File here
        if (file.photo){
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        // console.log(product)
        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error : "Failed to save tshirt to db"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined //grabing a photo from db takes time - see below method
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

//delete controller
exports.removeProduct = (req, res) => {
    let product = req.product
    product.remove((err, removedProduct) => {
        if (err) {
            return res.status(400).json({
                error : "Failed to delete the product"
            })
        }
        res.json({
            message: "Deletion was success",
            deletedProduct : removedProduct
        })
    })
}

//update product
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            })
        }

        //updation code
        let product = req.product
        product = _.extend(product, fields)

        //handle File here
        if (file.photo){
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        // console.log(product)
        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error : "Failed to update tshirt to db"
                })
            }
            res.json(product)
        })
    })
}

//listing products
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, allProducts) => {
        if (err) {
            return res.status(400).json({
                error : "No product found."
            })
        }
        res.send(allProducts)
    })
}

//update sold and stock
exports.updateStockAndSold = (req, res, next) => {
    let myOperations = req.body.order.products.map(product => {
        return {
            //open mongoose bulwrite method for updateOne
            updateOne: {
                filter: { _id: product._id },
                update : {$inc : {stock : -product.count, sold : + product.count}} //count coming from front end
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error : "Bulk operation failed - update sold and stock"
            })
        }
        next()
    })
}

//getallcats
exports.getAllUniqueCategories = (req, res, next) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error : "No categories found"
            })
        }
        res.json(categories)
        next()
    })
}