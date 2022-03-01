const router = require('express').Router();
const { models } = require('../model');
let validateJWT = require('../middleware/validate-session')

router.post('/', validateJWT, async (req, res) => {
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
                    message: 'diary entry was created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
          error: `Failed to create diary entry: ${err}`
        });
    };
});

router.get("/mydiaries", validateJWT, async (req,res) => {
    try {
        const userDiaries = await models.DiaryModel.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(userDiaries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:id', validateJWT, async (req, res) => {
    const {date, title, content} = req.body;
   
    const query = {
        where: {
            id: req.params.id
        }
    };

    const updatedDiary = {
       date,
       title,
       content
    };

    try {
        const update = await models.DiaryModel.update(updatedDiary, query);
        res.status(200).json(updatedDiary);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//Delete diary
router.delete("/:id", validateJWT, async (req,res) => {

    try {
        const query = {
            where: {
                id: req.params.id
            }
        };

        await models.DiaryModel.destroy(query);
        res.status(200).json({ message: "Diary Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = router;