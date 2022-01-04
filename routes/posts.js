const router = require('express').Router();
const {getPosts,createPost,updatePost,deletePost} = require('../controller/posts');

router.route('/').get(getPosts);
router.route('/add').post(createPost);
router.route('/:id').put(updatePost);
router.route('/:id').delete(deletePost);


module.exports = router;