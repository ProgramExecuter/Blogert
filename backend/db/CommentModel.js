const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
});

module.exports = mongoose.Model("Comment", commentSchema);
