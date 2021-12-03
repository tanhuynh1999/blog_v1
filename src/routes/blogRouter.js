const express = require('express');
const {
    uploadBlog
} = require('../common/uploadFile')
const blogController = require('../app/controllers/BlogController');
const commentController = require('../app/controllers/CommentController');
const replyController = require('../app/controllers/ReplyController');
const router = express.Router();

// Show View
router.get('/blog/binh_luan_cua_ban', blogController.indexComment);
router.get('/blog/blog_dang_theo_doi', blogController.indexFollow);
router.get('/blog/phan_hoi_cua_ban', blogController.indexReply);
router.get('/blog/blog_hot_nhat', blogController.indexHot);
router.get('/blog/blog_da_dang', blogController.indexUser);

// get ajax
router.get('/blog/comment/getbyuser', commentController.getCommentBlogByUser);
router.get('/blog/reply/getbyuser', replyController.getReplyBlogByUser);
router.get('/blog/comment/get/:id', commentController.getCommentBlog);
router.get('/blog/details/:id/:name', blogController.detailsView);
router.get('/blog/reply/get/:id', replyController.getReplyBlog);
router.get('/blog/follow/by/:id', blogController.getByIDFollow);
router.get('/blog/follow/get', blogController.getFollowBlog);
router.get('/blog/get/tab/:id', blogController.getTabBlog);
router.get('/blog/get/:common', blogController.getBlog);

//post ajax
router.post('/blog/create', uploadBlog('fileIMG'), blogController.createBlog);
router.post('/blog/follow/delete/:id', blogController.deleteFollowBlog);
router.post('/blog/details/:id/:name', blogController.detailsBlog);
router.post('/blog/active/:id/:active', blogController.activeBlog);
router.post('/blog/comment', commentController.createComment);
router.post('/blog/bin/:id/:active', blogController.binBlog);
router.post('/blog/delete/:id', blogController.deleteBlog);
router.post('/blog/reply', replyController.createReply);
router.post('/blog/follow', blogController.followBlog);
router.post('/blog/edit', blogController.editBlog);

module.exports = router;