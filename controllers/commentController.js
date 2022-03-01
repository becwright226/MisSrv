const router = require('express').Router();
const { models } = require('../model');
let validateJWT = require('../middleware/validate-session')

router.post('/', validateJWT, async (req,res) => {
    const {content, postId} = req.body;

    try {
        await models.CommentModel.create({
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