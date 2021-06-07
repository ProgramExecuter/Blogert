import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  dob: Date,
  profile: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: "India"
  },
  dateOfJoin: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post"
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }
  ],
  likedPosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post"
    }
  ],
  likedComments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

export default mongoose.model("User", userSchema);