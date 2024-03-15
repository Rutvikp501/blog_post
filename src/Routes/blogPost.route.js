const blogController  = require('../controllers/blog_posts.controller');

const router = require('express').Router();

router.get('/', blogController.GetAllPost);
router.post('/create', blogController.CreatePost);
router.get('/getpost/:id', blogController.GetSinglePost);
router.patch('/update/:id', blogController.UpdatePost);
router.delete('/delete/:id', blogController.DeletePost);



module.exports = router;