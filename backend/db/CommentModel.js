import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please comment something"],
    minlength: [4, "Comment should have minimum of 4 characters"]
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  user: {
    type: String,
    required: [true, "Please enter the username"]
  },
});

export default mongoose.model("Comment", commentSchema);
