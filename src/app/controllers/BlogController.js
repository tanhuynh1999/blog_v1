const blogModel = require('../models/BlogModel');
const userModel = require('../models/UserModel');
const tabBlogModel = require('../models/TabBlogModel');
const followModel = require('../models/FollowModel');
const historyViewModel = require('../models/HistoryView');

class BlogController {

    // GET
    detailsView = (req, res) => {
        res.render('blog/details');
    }

    indexHot = (req, res) => {
        res.render('blog/index_hot');
    }

    indexUser = (req, res) => {
        res.render('blog/index_user');
    }

    indexFollow = (req, res) => {
        res.render('blog/index_follow');
    }

    indexComment = (req, res) => {
        res.render('blog/index_comment');
    }

    indexReply = (req, res) => {
        res.render('blog/index_reply');
    }

    indexHistoryView = (req, res) => {
        res.render('blog/index_history_view');
    }

    getBlog = (req, res) => {
        if (req.params.common == "hot") {
            blogModel.find({
                bin: false,
                active: true,
                delete: false,
            }, function (err, data) {
                res.json({
                    data: data,
                    success: true
                });
            }).sort({
                view: -1
            })
        } else if (req.params.common == "user") {
            blogModel.find({
                bin: false,
                delete: false,
                idAuthor: req.cookies.idUser
            }, function (err, data) {
                res.json({
                    data: data,
                    success: true
                });
            }).sort({
                dateEdit: -1
            })
        } else if (req.params.common === "no_active") {
            blogModel.find({
                bin: false,
                delete: false,
                active: false,
                idAuthor: req.cookies.idUser
            }, function (err, data) {
                res.json({
                    data: data,
                    success: true
                });
            }).sort({
                dateEdit: -1
            })
        } else if (req.params.common == "bin") {
            blogModel.find({
                bin: true,
                delete: false,
                idAuthor: req.cookies.idUser
            }, function (err, data) {
                res.json({
                    data: data,
                    success: true
                });
            }).sort({
                dateEdit: -1
            })
        } else {
            blogModel.find({
                active: true,
                delete: false,
            }, function (err, data) {
                res.json({
                    data: data,
                    success: true
                });
            }).sort({
                dateEdit: -1
            })
        }
    }

    groupBlogTab = (req, res) => {
        tabBlogModel.find({}, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            name: 1
        })
    }

    getTabBlog = (req, res) => {
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

    getByIDFollow = (req, res) => {
        followModel.findOne({
            idBlog: req.params.id,
            idUser: req.cookies.idUser
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        })
    }

    getFollowBlog = (req, res) => {
        followModel.find({
            idUser: req.cookies.idUser
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

    seacrhBlog = (req, res) => {
        console.log(req.query);
        blogModel.find({
            title: {
                $regex: req.query.key
            },
            category: {
                $regex: req.query.category
            }
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    seacrhBlogCategory = (req, res) => {
        blogModel.find({
            category: {
                $regex: req.query.name
            }
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            dateEdit: -1
        })
    }

    searchBlogHot = (req, res) => {
        console.log(req.query);
        blogModel.find({
            title: {
                $regex: req.query.key
            },
            category: {
                $regex: req.query.category
            }
        }, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            view: -1
        })
    }

    detailsBlog = (req, res) => {
        blogModel.findById(req.params.id, function (err, data) {
            if (req.cookies.idUser !== undefined) {
                historyViewModel.findOne({
                    idBlog: req.params.id,
                    idUser: req.cookies.idUser
                }, function (err, data2) {
                    if (data2 == null) {
                        const historyViewNew = new historyViewModel();
                        historyViewNew.idBlog = req.params.id;
                        historyViewNew.idUser = req.cookies.idUser;
                        historyViewNew.titleProduct = data.title;
                        historyViewNew.author = data.author;
                        historyViewNew.avatar = data.avatar;
                        historyViewNew.category = data.category;
                        historyViewNew.describe = data.describe;
                        historyViewNew.image = data.image;
                        historyViewNew.save();
                    } else {
                        data2.dateEdit = Date.now();
                        data2.save();
                    }
                })
            }
            data.view = data.view + 1;
            data.save();
            res.json({
                data: data,
                status: true
            });
        })
    }


    createBlog = (req, res) => {
        userModel.findById(req.cookies.idUser, function (err, data) {
            const blogNew = new blogModel(req.query);
            blogNew.image = '/content/images/' + req.file.filename;
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
                messenger: '????ng blog ' + blogNew.title + ' th??nh c??ng.'
            });
        })
    }

    editBlog = (req, res) => {
        blogModel.findById(req.query._id, function (err, data) {

            data.title = req.query.title;
            data.category = req.query.category;
            data.descibe = req.query.descibe;
            data.content = req.query.content;
            data.dateEdit = Date.now();
            data.save();
            res.json({
                data: data,
                status: true,
                messenger: 'S???a blog ' + data.title + ' th??nh c??ng.'
            });
        })
    }

    activeBlog = (req, res) => {
        blogModel.findById(req.params.id, function (err, data) {
            data.active = !data.active;
            data.save();
            res.json({
                data: data,
                status: true,
                messenger: data.active ? 'B???t ho???t ?????ng cho blog ' + data.title + ' th??nh c??ng.' : 'Ng??ng ho???t ?????ng cho blog' + data.title + ' th??nh c??ng.'
            });
        })
    }

    binBlog = (req, res) => {
        blogModel.findById(req.params.id, function (err, data) {
            data.bin = !data.bin;
            data.save();
            res.json({
                data: data,
                status: true,
                messenger: data.active ? 'Xo?? blog ' + data.title + ' v??o th??ng r??c th??nh c??ng.' : 'Kh??i ph???c blog ' + data.title + ' th??nh c??ng.'
            });
        })
    }

    deleteBlog = (req, res) => {
        blogModel.findById(req.params.id, function (err, data) {
            data.delete = true;
            data.save();
            res.json({
                data: data,
                status: true,
                messenger: 'Xo?? v??nh vi???n blog ' + data.title + ' th??nh c??ng.'
            });
        })
    }

    followBlog = (req, res) => {

        const followNew = new followModel();
        followNew.title = req.query.title;
        followNew.describe = req.query.describe;
        followNew.avatar = req.query.avatar;
        followNew.author = req.query.author;
        followNew.category = req.query.category;
        followNew.image = req.query.image;
        followNew.idUser = req.cookies.idUser;
        followNew.idBlog = req.query._id;
        followNew.save();

        res.json({
            status: true,
            messenger: 'Theoi d??i blog ' + followNew.title + ' th??nh c??ng.'
        });
    }

    deleteFollowBlog = function (req, res) {
        followModel.findById(req.params.id, function (err, data) {
            data.delete();
            res.json({
                status: true,
                messenger: 'Hu??? theo d??i th??nh c??ng.'
            });
        })
    }
}

module.exports = new BlogController();