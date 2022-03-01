const router = require('express').Router();
const { models } = require('../model');

router.post('/comment', async (req,res) => {
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

module.exports = router;