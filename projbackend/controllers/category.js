const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error : 'Category not found in DB'
            })
        }
        req.category = cate
        next()
    })
    
    next()
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                error : 'Not able to save category in db.'
            })
        }
        res.json(cate)
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, cates) => {
        if (err) {
            return res.status(400).json({
                error : "No categories found"
            })
        }
        res.json(cates)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error : 'Fail to update category'
            })
        }  
        res.json({
            message : "Category updated successufully"
        })
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category
    
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error : `Failed to delete category : ${deletedCategory}`
            })
        }
        res.json({
            message : `Category: ${deletedCategory}, successfully deleted.`
        })
    })
}