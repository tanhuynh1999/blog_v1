const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/user/check', userController.checkUser);
router.get('/user/sign-out', userController.signOut);

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);

module.exports = router;