class CategoryController {
    index = (req, res) => {
        res.render('category');
    }
}

module.exports = new CategoryController();