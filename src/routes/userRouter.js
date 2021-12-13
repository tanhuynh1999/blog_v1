const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/user/info', userController.info);

router.get('/user/check', userController.checkUser);
router.get('/user/sign-out', userController.signOut);

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/edit', userController.editInfo);
router.post('/user/change_password', userController.changePassword);

module.exports = router;