const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authArticle = require('../middleware/authArticle');

const articleCtrl = require('../controllers/article.controllers.js');
const authAdmin = require('../middleware/authAdmin');
const multer = require('../middleware/multer-config');


router.post('/', multer, articleCtrl.create);
router.get('/', auth, articleCtrl.findAll);
router.get('/:articleId', auth, authArticle, articleCtrl.findOne);
router.get('/article/:userId',  auth, authAdmin, articleCtrl.findArticleWithUserId);
router.put('/:articleId',  auth, authArticle, articleCtrl.update);
router.delete('/:articleId',  auth, authArticle, articleCtrl.delete);
/* router.delete('/', auth, articleCtrl.deleteAll); */


module.exports = router;