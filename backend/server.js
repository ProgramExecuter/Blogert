const express = require('express');
const app = express();


// ROUTES
const userRoute     = require('./routes/UserRoute');
const postRoute     = require('./routes/PostRoute');
const commentRoute  = require('./routes/CommentRoute');
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);


// ENV Variables SETUP
require('dotenv').config();


// MONGODB SETUP
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then(res => console.log("DB Connected"))
  .catch(err => console.log(err));


// SERVER SETUP
app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT ${process.env.PORT}`);
});