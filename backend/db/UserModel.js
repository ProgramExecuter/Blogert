import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validation: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    default: ""
  },
  dob: Date,
  status: {
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
  followers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: "Post"
  }],
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }],
  likedPosts: [{
    type: mongoose.Types.ObjectId,
    ref: "Post"
  }],
  likedComments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }]
});

export default mongoose.model("User", userSchema);