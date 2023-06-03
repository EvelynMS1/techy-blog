const router = require('express').Router();
const {Comment, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res)=> {
    try{
        const commentData = await Comment.findAll({
            include:[
                {
                    model:User,
                    attributes:['username'],

                },
            ],
        });
        const comments = commentData.map((comment) => Comment.get({ plain:true}));
        res.status(200).render('homepage',{
            comments,
            logged_in:req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/comment/:id', async(req,res)=>{
    try{
        const commentData = await User.findByPk(req.session.user_id,{
            attributes: {exclude:['password']},
            include:[{model:Comment}],
        });
        const user = userData.get({plain:true});
        res.status(200).render('dashboard',{
            ...user,
            logged_in:true

        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', async(req,res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;