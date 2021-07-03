import express from 'express';
import postDB from '../db/postModel.js';

const router = express.Router();


//
// Get all Posts
//
router.get("/", (req, res) => {

  postDB.find({},(err, foundPosts) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(foundPosts);
    }
  })
  .catch(err => res.status(200).json(err));

});


//
// Create a new Post
//
router.post("/", async (req, res) => {
  const newPost = new postDB(req.body);

  await newPost.save()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json(err));

});


//
// Get a particular Post
//
router.get("/:post_id", async (req, res) => {
  
  await postDB.findById(req.params.post_id, (err, foundPost) => {
    if(err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(foundPost);
    }
  })
  .catch(err => res.status(400).json(err));

});


//
// Edit a particular Post
//
router.put("/:post_id", async (req, res) => {
  await postDB.findByIdAndUpdate(
    req.params.post_id,
    {
      title: req.body.title,
      picture: req.body.picture,
      caption: req.body.caption
    },
    (err, updatedCampground) => {
      if(err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json(updatedCampground);
      }
  })

});


//
// Delete a particular Post
//
router.delete("/:post_id", async (req, res) => {
  
  await postDB.findByIdAndRemove(req.params.post_id, (err) => {
    if(err) {
      res.status(502).json(err);
    } else {
      res.status(200).json({"message": "Post Deleted"});
    }
  })
  .catch(err => res.status(400).json(err));

});

export default router;