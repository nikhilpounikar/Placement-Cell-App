const express = require('express');
const passport = require('passport');

const postController = require('../controller/posts_controller');
const router = express.Router();



router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete/:id',passport.checkAuthentication,postController.destoy);

module.exports = router;