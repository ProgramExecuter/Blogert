import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userDB from '../db/userModel';

const router = express.Router();

const saltRounds = 10;

//For 3 days(in seconds)
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, {
    expiresIn: maxAge
  });
};


// Create a new User
router.post("/signup", async (req, res) => {

  await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if(err) {
      res.status(400).json(err);
    }
    else {
      req.body.password = hash;
      const user = new userDB(req.body);

      await user.save()
        .then(newUser => {
          try {
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

router.post("/login", async (req, res) => {

  await userDB.findOne({username: req.body.username}, (err, foundUser) => {
    if(err) {
      res.status(404).status(err);
    }
    else {
      bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
        if(!result) {
          res.status(400).json(err);
        }
        else {
          try {
            const token = createToken(foundUser._id);
            res.cookie('jwt', token, { maxAge: maxAge*1000 });
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

export default router;