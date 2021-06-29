import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter a Username"],
    unique: [true, "This username is taken"],
    lowercase: [true, "Username should be all lowercase"],
    minlength: [1, "Username should atleast have 1 characters"]
  },
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    unique: [true, "This email is already taken"],
    validate: [validator.isEmail, "Please enter an valid email"]
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
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
  }
});

export default mongoose.model("User", userSchema);