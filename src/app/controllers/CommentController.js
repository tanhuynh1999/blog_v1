const commentModel = require('../models/CommentModel');

class CommentController {

    // [GET]
    getCommentBlog = (req, res) => {
        commentModel.find({
            idBlog: req.params.id
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    getCommentBlogByUser = (req, res) => {
        commentModel.find({
            idUser: req.cookies.idUser
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    // [POST]
    createComment = (req, res) => {
        const commentNew = new commentModel(req.query);
        commentNew.idUser = req.cookies.idUser;
        commentNew.save();
        res.json({
            status: true,
            message: 'Bình luận thành công'
        });

    }
}

module.exports = new CommentController();