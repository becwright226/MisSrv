const router = require('express').Router();
const { models } = require('../model');

router.post('/diary', async (req, res) => {
    const {date, title, content} = req.body;

    try {
        await models.DiaryModel.create({
            date,
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