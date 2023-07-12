const router = require('express').Router();
const{ Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// router path for commentRoutes
// api/comments
//add a comment on homepage probably a put on the comment /comment/:id that is selected  withAuth, 
router.post('/createComment/:id',withAuth,async(req,res)=>{
    try{
        const newComment = await Comment.create({
            title:req.body.comment,
            comment:req.body.comment, 
            user_id:req.body.user_id,
            blog_id:req.params.id,
        });
        res.status(200).json(newComment);

    } catch(err) {
        res.status(400).json(err);
    }
});


module.exports = router;