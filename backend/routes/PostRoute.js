import express from 'express';
import postDB from '../db/PostModel.js';

const router = express.Router();


// Get all Posts
router.get("/", (req, res) => {

  postDB.find({}, (err, foundPosts) => {
    if(err) {
      console.log(err);
    } else {
      res.status(200).send(foundPosts);
    }
  });

});


// Create a new Post
router.post("/", (req, res) => {
  
  let newPost = req.body.input;
  postDB.create(newPost, (err, createdPost) => {
    if(err) {
      console.log(err);
      res.status(503);
    } else {
      res.status(201).send("Created");
    }
  });

});


// Get a particular Post
router.get("/:post_id", (req, res) => {
  
  postDB.findById(req.params.post_id, (err, foundPost) => {
    if(err) {
      res.status(404);
    } else {
      res.status(200).send(foundPost);
    }
  });

});


// Edit a particular Post
router.put("/:post_id", (req, res) => {
  
  postDB.findOneAndUpdate(req.params.post_id, req.body.input, (err, updatedCampground) => {
    if(err) {
        res.status(502);
    } else {
        res.status(200).send("Updated");
    }
  });

});


// Delete a particular Post
router.delete("/:post_id", (req, res) => {
  
  postDB.findByIdAndRemove(req.params.post_id, (err) => {
    if(err) {
      res.status(502);
    } else {
      res.status(200).send("Deleted");
    }
  });

});

export default router;
