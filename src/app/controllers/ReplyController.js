const replyModel = require('../models/ReplyController');

class ReplyController {

    // [GET]
    getReplyBlog = (req, res) => {
        replyModel.find({
            idComment: req.params.id
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    getReplyBlogByUser = (req, res) => {
        replyModel.find({
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
    createReply = (req, res) => {
        const replyNew = new replyModel(req.query);
        replyNew.idUser = req.cookies.idUser
        replyNew.save();
        res.json({
            status: true,
            message: 'Phản hồi bình luận từ ' + replyNew.author + ' thành công'
        });
    }
}

module.exports = new ReplyController();