const express = require('express');
const router = express.Router();

// Importing User Model
const userDB = require("../db/UserModel");


// Create a new User
router.post("/", (req, res) => {
  res.send("New User Created");
});


// Get a particular User
router.get("/:user_id", (req, res) => {
  res.send("User Found with Id "+req.params.user_id);
});


// Edit a particular User Info
router.put("/:user_id", (req, res) => {
  res.send("User Info Edited");
});


// Delete a particular User
router.delete("/:user_info", (req, res) => {
  res.send("User Deleted");
});


module.exports = router;