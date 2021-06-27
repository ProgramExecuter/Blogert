import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoute      from './routes/userRoute.js';
import postRoute      from './routes/postRoute.js';
import commentRoute   from './routes/commentRoute.js';
import authRoute      from './routes/authRoute.js';


//APP CONFIGS
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// ROUTES
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/auth", authRoute);


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
