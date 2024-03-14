const BlogPost  = require('../controllers/blog_posts.controller');

const router = require('express').Router();

router.get('/',BlogPost.GetAllPost)
router.post('/createPost',BlogPost.CreatePost)



module.exports = router;