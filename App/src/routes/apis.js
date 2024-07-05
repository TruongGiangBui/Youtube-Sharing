const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const postController = require('../app/controllers/PostController');
const middleware=require("../app/middleware/AuthMiddleware")

router.post('/auth/register',middleware.cors,authController.register)
router.post('/auth/login',middleware.cors,authController.login)
router.get('/auth/userInfo',middleware.cors,middleware.authorize,authController.getUserInfo)
router.post('/post/shareVideo',middleware.cors,middleware.authorize,postController.shareVideo)
router.get('/post/newpost',middleware.cors,middleware.authorize,postController.getNewFeed)
router.get('/post/notifications',middleware.cors,middleware.authorize,postController.getNotification)
module.exports = router;
