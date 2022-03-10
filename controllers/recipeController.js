const router = require('express').Router();
const {models} = require('../model');
let validateJWT = require('../middleware/validate-session')


//! Creating an order log
router.post("/", validateJWT, async (req, res) => {
if (req.user.role==='Admin') {
    const { cuisine, title, course, desc, time, method} = req.body
    try {
        const createRecipe = await models.RecipeModel.create({
            cuisine, 
            title,
            course,
            desc,
            time,
            method
        });
  
        console.log(createRecipe);
  
        res.status(201).json({
            message: 'Recipe successfully recorded',
            createRecipe
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create recipe ${err.message}`
        })
    }
} else {
    console.log('You do not have authority here')
}
  });

  //! Get all recipes
  router.get('/allrecipes', validateJWT, async (req, res) => {
    if (req.user.role==='Admin') {
    
    try {
        const allRecipes = await models.RecipeModel.findAll()
  
        res.status(200).json(allRecipes)
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    }
} else if (req.user.role==='BOH') {
    try {
        const allRecipes = await models.RecipeModel.findAll()
  
        res.status(200).json(allRecipes)
  
    } catch (err) {
  
        res.status(500).json({
            error: err,
            message: "The server broke but the app is still running"
        });
    } 
} else {
    console.log('You do not have authority here')
}
  });

  //! Get recipe by title
  router.get('/:title', async (req, res) => {
    const  { title } = req.params;
    try {
        const results = await models.RecipeModel.findAll({
            where: {title: title}
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Get recipe by style 
router.get('/:style', async (req, res) => {
    const  { style } = req.params;
    try {
        const results = await models.RecipeModel.findAll({
            where: {style: style}
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});

//! Update recipe by ID:
router.put('/:id', validateJWT, async (req, res) => {
    if (req.user.role==='Admin') {
    const {  
        style, 
        title,
        course,
        desc,
        time,
        method } = req.body;
    const recipeId = req.params.id;
    

    const query = {
        where: {
            id: recipeId,
        }
    };

    const updatedRecipe = {
        style, 
        title,
        course,
        desc,
        time,
        method
    };

    try {
        const update = await models.RecipeModel.update(updatedRecipe, query);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
});

//! Delete recipe by ID:
router.delete("/:id", validateJWT, async (req,res) => {
    if (req.user.role==='Admin') {
    const recipeId = req.params.id;

    try {
        const query = {
            where: {
                id: recipeId,
            }
        };

        await models.RecipeModel.destroy(query);
        res.status(200).json({ message: "Recipe Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
} else {
    console.log('You do not have authority here')
}
})



module.exports = router;