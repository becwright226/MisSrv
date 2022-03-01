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
            log => {
                res.status(201).json({
                    log,
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

//All logs
router.get('/logs', async (req, res) => {
    try {
        const allLogs = await models.LogModel.findAll()
  
        res.status(200).json(allLogs)
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    }
  });

  //all personal logs
  //! GET ALL YOUR OWN POSTS - This is actually just getting all posts?????????????????????
router.get("/mylogs", validateJWT, async (req,res) => {
    let { id } = req.user;
    try {
        const userLogs = await models.LogModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//! UPDATE LOg BY ID:
router.put('/:id', validateJWT, async (req, res) => {
    const {date,task,time, scheduleId} = req.body;

    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };

    const updatedLog = {
        date,
        task,
        time,
        scheduleId,
    };

    try {
        const update = await models.LogModel.update(updatedLog, query);
        res.status(200).json(updatedLog);
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

        await models.LogModel.destroy(query);
        res.status(200).json({ message: "Log Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



module.exports = router;