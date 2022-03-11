const router = require('express').Router();
const { models } = require('../model');
let validateJWT = require('../middleware/validate-session')

router.post('/:postId', validateJWT, async (req,res) => {
    const {date, content} = req.body;
    const {postId} = req.params;

    try {
        await models.CommentModel.create({
            date,
            content,
            postId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment,
                    message: 'comment created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        });
    };
});


    router.get('/:postId',validateJWT, async (req, res) => {
        const {postId} = req.params
        
        try {
            const allComments = await models.CommentModel.findAll({
                where: {
                    postId: postId
                }
            })
      
            res.status(200).json(allComments)
      
        } catch (err) {
      
            res.status(500).json({
                error: err,
                message: "The server broke but the app is still running"
            });
        }
      });


router.put('/:id', validateJWT, async (req, res) => {
    const {content, postId} = req.body;

    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };

    const updatedComment = {
       content,
       postId
    };

    try {
        const update = await models.CommentModel.update(updatedComment, query);
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async (req,res) => {
    try {
        const query = {
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        };

        await models.CommentModel.destroy(query);
        res.status(200).json({ message: "Comment Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;