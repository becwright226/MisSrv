const router = require('express').Router();
const { models } = require('../models');

router.post('/post', async (req, res) => {
    const {title, content} = req.body;

    try {
        await models.PostModel.create({
            title,
            content,
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

module.exports = router;