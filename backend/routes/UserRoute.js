import express from 'express';
import userDB from "../db/userModel.js";
import postDB from "../db/postModel.js";

const router = express.Router();

//
// Get a particular user with username
//
router.get("/:username", async(req, res) => {

  await userDB.findOne({username: req.params.username}, (err, foundUser) => {
    if(err) {
      res.status(400).json(err);
    }
    else if(!foundUser) {
      res.status(400).json({"message": "User not found"});
    }
    else {
      res.status(200).json(foundUser);
    }
  });

});

//
// Edit a particular User Info
//
router.put("/:user_id", async (req, res) => {
  //Get all the new data from the REQUEST
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

  //Function to update the User Info
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

  //Hash the password before updating it
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


//
// Delete a particular User
//
router.delete("/:user_id", async (req, res) => {
  //Find if the USER exists
  await userDB.findById(req.params.user_id, async (err, foundUser) => {
    if(err) {
      //If the USER does not exist return the error message
      res.status(404).json(err);
    }
    else {
      //If the USER exists, then delete all the posts by that user
      await postDB.deleteMany({_id: foundUser._id}, async (err) => {

        //After deleting all the posts, delete the USER itself
        await userDB.findByIdAndRemove(foundUser._id, (err) => {
          if(err) {
            //If the user is not deleted, send the err message
            res.status(400).json(err);
          }
          else {
            //If the user is deleted send this
            res.status(200).json({"message": "Deleted user"});
          }
        })

      });
    }
  })

});


//
// Get all the posts of a user
//
router.get("/:username/post", async (req, res) => {
  //Find the USER
  await userDB.findOne({username: req.params.username}, async (err, foundUser) => {
    if(err) {
      res.status(400).json(err)
    }
    else if(!foundUser) {
      res.status(404).json({"message": "User not found"});
    }
    else
    {
      await postDB.find({username: req.params.username}, (err, foundPosts) => {
        if(err) {
          res.status(400).json(err);
        }
        else if(!foundPosts) {
          res.status(404).json([]);
        }
        else {
          res.status(200).json(foundPosts);
        }
      })
      .catch(err => res.status(400).json(err));
    }
  })
  .catch(err => res.status(400).json(err));
});

export default router;