const express = require('express');
const categoryController = require('../app/controllers/categoryController');
const router = express.Router();

router.get('/category', categoryController.index);

module.exports = router;