const router = require('express').Router();
const { models } = require('../model');
let validateJWT = require('../middleware/validate-session')

router.post('/',validateJWT, async (req, res) => {
    if (req.user.role==='admin') {
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
} else {
    console.log('You do not have authority here')
}
});

//get all schedules w/ logs
router.get('/schedules', async (req, res) => {
    try {
        await models.SchedModel.findAll({
            include: [{
                model: models.LogModel
            }]
        })
        .then(
            allSchedules => {
                res.status(200).json({
                    allSchedules
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
//get sched by id
  router.get('/:id', async (req, res) => {
    
    try {
       await models.SchedModel.findAll({
            where:{ id: req.params.id},
            include: [{
                model: models.LogModel//"Invalid value: {models:log}"
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
        res.status(500).json({ error: err.message });
    }
});

//update sched
router.put('/:id', validateJWT, async (req, res) => {
    if (req.user.role==='admin') {
    const {date, task, desc, empAssign, time} = req.body;
    const scheduleId = req.params.id;
    
//will work with uuid but not idPK
    const query = {
        where: {
            id: scheduleId
        }
    };

    const updatedSched = {
       date,
       task,
       desc,
       empAssign,
       time
    };

    try {
        const update = await models.SchedModel.update(updatedSched, query);
        res.status(200).json(updatedSched);
    } catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
});
//delete sched
router.delete("/:id", validateJWT, async (req,res) => {
    if(req.user.role==='admin') {
   

    try {
        const query = {
            where: {
                id:  req.params.id
            }
        };

        await models.SchedModel.destroy(query);
        res.status(200).json({ message: "Schedule Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
})


module.exports = router;