const express = require('express');
const router = express.Router();


// Get all Posts
router.get("/", (req, res) => {
  res.send("All Posts");
});


// Create a new Post
router.post("/", (req, res) => {
  res.send("New Post Created");
});


// Get a particular Post
router.get("/:post_id", (req, res) => {
  res.send("Post found with id "+req.params.post_id);
});


// Edit a particular Post
router.put("/:post_id", (req, res) => {
  res.send("Post Edited");
});


// Delete a particular Post
router.delete("/:post_id", (req, res) => {
  res.send("Post Deleted");
});

module.exports = router;
