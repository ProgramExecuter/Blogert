import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  caption: String,
  picture: String,
  post_date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  tags: [{
    type: String
  }],
  score: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Post", postSchema);
