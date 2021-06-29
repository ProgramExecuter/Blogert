import express from 'express';
import userDB from "../db/userModel.js";

const router = express.Router();

// Get a particular User
router.get("/:user_id", async (req, res) => {
  
  await userDB.findById(req.params.user_id, (err, foundUser) => {
    if(err) {
      res.status(404).json(err);
    }
    else {
      res.status(200).json(foundUser);
    }
  });

});


// Edit a particular User Info
router.put("/:user_id", async (req, res) => {
  let user = {};
  if(req.body.email)
    user.email = req.body.email;
  if(req.body.name)
    user.name = req.body.name;
  if(req.body.status)
    user.status = req.body.status;
  if(req.body.dob)
    user.dob = req.body.dob;
  if(req.body.country)
    user.country = req.body.country;
  if(req.body.password)
    user.password = req.body.password;

  const updateDB = async () => {
    await userDB.findByIdAndUpdate(req.params.user_id, {$set: user}, (err, updatedUser) => {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json(updatedUser);
      }
    })
    .catch(err => (res.status.json(err)));
  };

  if(req.body.password)
  {
    await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if(err) {
        res.status(400).json(err);
      }
      else {
        user.password = hash;
        updateDB();
      }
    })
    .catch(e => res.status(400).json(err));
  }
  else
  {
    updateDB();
  }

});


// Delete a particular User
router.delete("/:user_id", async (req, res) => {
  
  await userDB.findByIdAndRemove(req.params.user_id, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else {
      res.status(200).json({"message": "Deleted user"});
    }
  })

});


export default router;