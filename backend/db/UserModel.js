import mongoose from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter a Username"],
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    unique: true,
    validate: [isEmail, "Please enter an valid email"]
  },
  password: {
    type: [true, "Please Enter the Password"],
    required: true,
    minlength: [6, "Password should have atleast 6 characters"]
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