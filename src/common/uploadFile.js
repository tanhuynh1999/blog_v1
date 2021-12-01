const multer = require('multer');
module.exports = {
    uploadBlog: function (fileIMG) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'src/public/content/images')
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = 'blog-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        })
        const upload = multer({
            storage: storage
        })

        return upload.single(fileIMG);
    }
}