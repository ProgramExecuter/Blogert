const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

// ENV Variables SETUP
dotenv.config();

///
///
/// MONGODB SETUP
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then(res => console.log("DB Connected"))
  .catch(err => console.log(err));

///
///
/// SERVER SETUP
app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT ${process.env.PORT}`);
});