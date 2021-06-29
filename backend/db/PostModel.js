import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a Title"],
    unique: [true, "This title is already being used"],
    minlength: [1, "Title should have minimum length of 1 characters"]
  },
  caption: {
    type: String,
    required: [true, "Please enter a Caption"],
    minlength: [4, "Caption should be minimum of 4 characters"]
  },
  picture: String,
  username: {
    type: String,
    required: [true, "Please Enter a Username"],
    unique: [true, "This username is taken"],
    lowercase: [true, "Username should be all lowercase"],
    minlength: [1, "Username should atleast have 1 characters"]
  },
  post_date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Post", postSchema);
