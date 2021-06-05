import mongoose from 'mongoose';

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

export default mongoose.Model("Comment", commentSchema);
