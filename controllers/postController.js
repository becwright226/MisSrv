const router = require('express').Router();
const {models} = require('../model');
let validateJWT = require('../middleware/validate-session')

router.post('/', validateJWT, async (req, res) => {
    const {date, title, content, role} = req.body;

    try {
        await models.PostModel.create({
            date,
            title,
            content,
            role,
            userId: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    post,
                    message: 'post was created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
          error: `Failed to create post: ${err}`
        });
    };
});
//get all posts for you
router.get('/allposts', async (req, res) => {
    try {
        await models.PostModel.findAll({
            include: [{
                model: models.CommentModel
            }]
        })
        .then(
            allPosts => {
                res.status(200).json({
                    allPosts
                });
            }
        )
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    }
  });
//
//! GET POSTS BY Role
router.get('/:role', async (req, res) => {
    const  { role } = req.params;
    try {
       await models.PostModel.findAll({
            where:[{ role: role,
            include: [{
                model: models.CommentModel
                }
            ]
           }
        ]
    })
    .then(
        results => {
            res.status(200).json({
               results
            });
        }
    )
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});

// Update post by id
router.put('/:id', validateJWT, async (req, res) => {
    const {date, title, content, role} = req.body;
    const postId = req.params.id;


    const query = {
        where: {
            id: postId
        }
    };

    const updatedPost = {
       date,
       title,
       content,
       role
    };

    try {
        const update = await models.PostModel.update(updatedPost, query);
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//Delete post
router.delete("/:id", validateJWT, async (req,res) => {
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
            }
        };

        await models.PostModel.destroy(query);
        res.status(200).json({ message: "Post Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router;