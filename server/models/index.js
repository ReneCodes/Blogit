const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL || 'mongodb+srv://Cluster06927:blogit123@cluster06927.6tynthw.mongodb.net/blogit?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
