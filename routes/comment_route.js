const express = require('express');
const passport = require('passport');

const commentsController = require('../controller/comment_controller');
const router = express.Router();



router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/delete/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;