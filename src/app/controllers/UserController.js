const userModel = require('../models/UserModel');
class UserController {


    info = (req, res) => {
        res.render('user/info');
    }

    changePassword = (req, res) => {
        console.log(req.query);
        userModel.findOne({
            _id: req.cookies.idUser,
            password: req.query.passwordOld
        }, function (err, data) {
            if (data == null) {
                res.json({
                    status: false,
                    message: 'Mật khẩu cũ đã sai, vui lòng nhập lại'
                });
            } else {
                data.password = req.query.passwordNew;
                data.save();

                res.clearCookie('idUser');
                res.json({
                    status: true,
                });
            }
        })
    }

    editInfo = (req, res) => {
        if (req.query.userName !== "" && req.query.email !== "" && req.query.nameView !== "" || req.query.userName !== "" && req.query.nameView || req.query.userName !== "" && req.query.email || req.query.nameView !== "" && req.query.userName || req.query.nameView !== "" && req.query.email) {
            res.json({
                status: false,
                message: 'Hãy nhập 1 thành phần để sửa, không thể nhập nhiều ô cùng 1 lúc'
            });
        } else if (req.query.userName !== "") {
            userModel.findOne({
                userName: req.query.userName
            }, function (err, data) {
                if (data == null) {

                    userModel.findById(req.cookies.idUser, function (err, data2) {

                        data2.userName = req.query.userName;
                        data2.save();

                        res.clearCookie('idUser');
                        res.json({
                            status: true,
                        });
                    })
                } else {
                    res.json({
                        status: false,
                        message: 'Tên đăng nhập này đã tồn tại'
                    });
                }
            })
        } else if (req.query.nameView !== "") {
            userModel.findOne({
                userName: req.query.nameView
            }, function (err, data) {
                if (data == null) {

                    userModel.findById(req.cookies.idUser, function (err, data2) {

                        data2.nameView = req.query.nameView;
                        data2.save();

                        res.clearCookie('idUser');
                        res.json({
                            status: true,
                        });
                    })
                } else {
                    res.json({
                        status: false,
                        message: 'Tên hiển thị này đã tồn tại'
                    });
                }
            })
        } else if (req.query.email !== "") {
            userModel.findOne({
                userName: req.query.email
            }, function (err, data) {
                if (data == null) {

                    userModel.findById(req.cookies.idUser, function (err, data2) {

                        data2.email = req.query.email;
                        data2.save();

                        res.clearCookie('idUser');
                        res.json({
                            status: true,
                        });
                    })
                } else {
                    res.json({
                        status: false,
                        message: 'Tên hiển thị này đã tồn tại'
                    });
                }
            })
        } else {
            res.json({
                status: false,
                message: 'Không có dữ liệu thay đổi'
            });
        }
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