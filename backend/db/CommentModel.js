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
  username: {
    type: String,
    required: [true, "Please Enter a Username"],
    unique: [true, "This username is taken"],
    lowercase: [true, "Username should be all lowercase"]
  }
});

export default mongoose.model("Comment", commentSchema);
