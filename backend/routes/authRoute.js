import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDB from '../db/userModel';

const router = express.Router();

const saltRounds = 10;

//
//Function to generate a token
//
//For 3 days(in seconds)
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, {
    expiresIn: maxAge
  });
};


//
// Create a new User(SignUp)
//
router.post("/signup", async (req, res) => {

  //Hashing the password before saving
  await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if(err) {
      res.status(400).json(err);
    }
    else {
      req.body.password = hash;
      const user = new userDB(req.body);

      //Saving a new USER into the database
      await user.save()
        .then(newUser => {
          try {
            //When user is saved then a cookie is generated with user_id in it
            const token = createToken(newUser._id);
            res.cookie('jwt', token, { maxAge: maxAge*1000 });
          }
          catch(err) {
            res.status(400).json(err);
          }
          res.status(200).json(newUser)
        })
        .catch(err => res.status(400).json(err));
    }
  })
  .catch(err => res.status(400).json(err));

});


//
//Login Route
//
router.post("/login", async (req, res) => {

  //Find if the USER is present in the database
  await userDB.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) {
      //If the USER is not found then return error
      res.status(404).json(err);
    }
    else {
      //If the user is present then check if password is correct
      bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
        if(!result) {
          res.status(400).json(err);
        }
        else {
          //If the user is logged in then cookie is generated with user_id in it
          try {
            const token = createToken(foundUser._id);
            res.cookie('jwt', token, { maxAge: maxAge*1000 });
            res.status(200).json(foundUser);
          }
          catch(err) {
            res.status(400).json(err);
          }
        }
      });
    }
  })
  .catch(err => res.status.json(err));

});


//
//Logout
//
router.get("/logout", async (req, res) => {
  //Cookie is deleted
  await res.cookie('jwt', "", { maxAge : 0})
          .then(() => res.status(200).json({message :"Logged Out"}))
          .catch((e) => res.status(400).json(err));
});

export default router;