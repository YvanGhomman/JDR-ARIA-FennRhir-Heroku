const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authComment = require('../middleware/authComment');

const commentCtrl = require('../controllers/comment.controllers.js');


router.post('/', commentCtrl.create);
router.get('/', auth, commentCtrl.findAll);
router.get('/:articleId/comment',  auth, commentCtrl.findComsWithArticleId);
router.get('/:commentId', auth, authComment, commentCtrl.findOne);
router.put('/:commentId',  auth, authComment,  commentCtrl.update);
router.delete('/:commentId',  auth, authComment, commentCtrl.delete);
/* router.delete('/', auth, commentCtrl.deleteAll);*/


module.exports = router;