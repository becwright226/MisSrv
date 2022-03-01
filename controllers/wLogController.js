const router = require('express').Router();
const { models } = require('../model');

router.post('/log', async (req,res) => {
    const {date,task,time, scheduleId} = req.body;

    try {
        await models.LogModel.create({
            date,
            task,
            time,
            scheduleId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment,
                    message: 'work log recorded'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to log work: ${err}`
        });
    };
});

module.exports = router;