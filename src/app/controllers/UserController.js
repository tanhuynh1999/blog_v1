const userModel = require('../models/UserModel');
class UserController {

    register = (req, res) => {

        const userNew = new userModel(req.query)
        userNew.save();

        res.cookie('idUser', userNew._id, {
            expires: new Date(Date.now() + 900000)
        });

        res.json({
            status: true,
            message: 'Đăng ký thành công'
        });
    }

    login = (req, res) => {
        userModel.findOne({
            userName: req.query.userName,
            password: req.query.password
        }, function (err, data) {
            res.cookie('idUser', data._id, {
                expires: new Date(Date.now() + 90000000)
            });
            res.json({
                status: true
            });
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