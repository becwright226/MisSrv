const router = require('express').Router();
const { models } = require('../model');

router.post('/schedule', async (req, res) => {
    const {date, task, desc, empAssign, time} = req.body;

    try {
        await models.SchedModel.create({
            date,
            task,
            desc,
            empAssign,
            time,
            userId: req.user.id
        })
        .then(
            schedule => {
                res.status(201).json({
                    schedule,
                    message: 'schedule was created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
          error: `Failed to create schedule: ${err}`
        });
    };
});

module.exports = router;