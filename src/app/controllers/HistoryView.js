const historyViewModel = require('../models/HistoryView');

class HistoryViewController {
    indexHistoryView = (req, res) => {
        historyViewModel.find({
            idUser: req.cookies.idUser
        }, function (err, data) {
            res.json({
                data: data,
                status: true
            });
        }).sort({
            dateEdit: -1
        })
    }
}

module.exports = new HistoryViewController();