const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const MONGODB_URI = process.env.MONGODB_URI;



const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
   
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB()


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});