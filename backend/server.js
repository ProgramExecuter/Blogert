import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoute     from './routes/UserRoute.js';
import postRoute     from './routes/PostRoute.js';
import commentRoute  from './routes/CommentRoute.js';


//APP CONFIGS
const app = express();
cors();
app.use(express.json());


// ROUTES
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);


// ENV Variables SETUP
dotenv.config();


// MONGODB SETUP
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex: true
})
  .then(res => console.log("DB Connected"))
  .catch(err => console.log(err));


// SERVER SETUP
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
