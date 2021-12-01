const express = require('express');
const {
    uploadBlog
} = require('../common/uploadFile')
const blogController = require('../app/controllers/BlogController');
const router = express.Router();

router.get('/blog/get', blogController.getBlog);
router.get('/blog/details/:id/:name', blogController.detailsView);
router.get('/blog/get/tab/:id', blogController.getTabBlog);

router.post('/blog/create', uploadBlog('fileIMG'), blogController.createBlog);
router.post('/blog/details/:id/:name', blogController.detailsBlog);

module.exports = router;