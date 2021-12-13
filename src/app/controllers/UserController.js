const userModel = require('../models/UserModel');
class UserController {


    info = (req, res) => {
        res.render('user/info');
    }

    register = (req, res) => {

        if (req.query.userName != null) {
            userModel.findOne({
                userName: req.query.userName
            }, function (err, data) {
                if (data == null) {
                    if (req.query.nameView != null) {
                        userModel.findOne({
                            nameView: req.query.nameView
                        }, function (err, data) {
                            if (data == null) {
                                const userNew = new userModel(req.query)
                                userNew.save();

                                res.cookie('idUser', userNew._id, {
                                    expires: new Date(Date.now() + 900000)
                                });

                                res.json({
                                    status: true,
                                    message: 'Đăng ký thành công'
                                });
                            } else {
                                res.json({
                                    status: false,
                                    message: 'Tên hiển thị đã tồn tại, vui lòng chọn tên khác'
                                });
                            }
                        })
                    }
                } else {
                    res.json({
                        status: false,
                        message: 'Tên đăng nhập đã tồn tại, vui lòng chọn tên khác'
                    });
                }
            })
        } else {
            res.json({
                status: false,
                message: 'Có vẻ bạn đang để trống một số trường bắt buộc'
            });
        }


    }

    login = (req, res) => {
        userModel.findOne({
            userName: req.query.userName,
            password: req.query.password
        }, function (err, data) {
            if (data == null) {
                res.json({
                    status: false,
                    message: 'Sai tài khoản hoặc mật khẩu'
                });
            } else {
                res.cookie('idUser', data._id, {
                    expires: new Date(Date.now() + 90000000)
                });
                res.json({
                    status: true
                });
            }
        })
    }

    signOut = (req, res) => {
        res.clearCookie('idUser');
        res.json({
            status: true,
            message: 'Đăng xuất tài khoản thành công'
        });

    }

    checkUser = (req, res) => {
        userModel.findById(req.cookies.idUser, function (err, data) {
            res.json({
                data: data,
                success: true
            });
        })
    }
}

module.exports = new UserController();