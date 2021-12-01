const blogModel = require('../models/BlogModel');
const userModel = require('../models/UserModel');
const tabBlogModel = require('../models/TabBlogModel');

class BlogController {

    // GET
    detailsView = (req, res) => {
        res.render('blog/details');
    }

    getBlog = (req, res) => {
        blogModel.find({
            active: true,
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    getTabBlog = (req, res) => {
        console.log(req.params.id);

        tabBlogModel.find({
            idBlog: req.params.id
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            name: 1
        })
    }

    // POST

    detailsBlog = (req, res) => {
        blogModel.findById(req.params.id, function (err, data) {
            res.json({
                data: data,
                status: true
            });
        })
    }


    createBlog = (req, res) => {
        userModel.findById(req.cookies.idUser, function (err, data) {

            const blogNew = new blogModel(req.query);
            blogNew.image = 'content/images/' + req.file.filename;
            blogNew.idAuthor = req.cookies.idUser;

            blogNew.author = data.nameView;
            blogNew.avatar = data.image;

            for (let i = 0; i < req.query.tag.length; i++) {
                const tabBlogNew = new tabBlogModel();
                tabBlogNew.idBlog = blogNew._id;
                tabBlogNew.name = req.query.tag[i];
                tabBlogNew.save();
            }

            blogNew.save();

            res.json({
                status: true,
                messenger: 'Đăng blog ' + blogNew.title + ' thành công.'
            });
        })
    }
}

module.exports = new BlogController();