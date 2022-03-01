const router = require("express").Router()
const {models} = require('../model');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UniqueConstraintError } = require('sequelize/lib/errors');

//! REGISTER
router.post("/register", async (req, res) => {

  const { firstName, lastName, email, password, role } = req.body

  try {
     await models.UserModel.create({
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, 10),
          role  
      })
      .then(
          user => {
            const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            {expiresIn: 60 * 60 * 24 });
            res.status(201).json({
             message: "User created",
             user: user,
             token
      })
    }
)
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: 'Username already in use'
        });
    } else {
        res.status(500).json({
            error: `Failed to register user: ${err}`
        });
    };
};
});



//! LOGIN

router.post('/login', async (req, res) => {
  const { email, password, role} = req.body;

  try {
      let loginUser = await models.UserModel.findOne({
          where: { email } //?how do I make restricted access based on role
      });

      if (loginUser) {
              let passwordComparison = await bcrypt.compare(password, loginUser.password);
  
              if (passwordComparison) {
      
              let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 60 * 24});
      
              res.status(200).json({
                  user: loginUser,
                  message: 'User successfully logged in!',
                  token
                  });
              } 
      } else {
          res.status(401).json({
              message: 'Incorrect email'
          })
      } 
    
     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: 'Failed to log user in'
         })
       }
  });
  
module.exports = router