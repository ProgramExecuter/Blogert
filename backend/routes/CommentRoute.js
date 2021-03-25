const express = require('express');
const router = express.Router();


// Create a new Comment
router.post("/", (req, res) => {
  res.send("New Comment Created");
});


// Get a particular Comment
router.get("/:comment_id", (req, res) => {
  res.send("Comment found with Id "+req.params.comment_id);
});


// Edit a particular Comment
router.put("/:comment_id", (req, res) => {
  res.send("Comment Edited");
});


// Delete a particular Comment
router.delete("/:comment_id", (req, res) => {
  res.send("Comment Deleted");
});


module.exports = router;