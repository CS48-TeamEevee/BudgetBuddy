const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController.js');

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.post('/api/signup', userController.createUser, (req, res) => {
  console.log("or here");
  res.status(200).json(res.locals.user);
});

app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

app.get('/api/users', userController.getAllUsers, (req, res) => {
  console.log("are we here");
  res.status(200).json(res.locals.user);
})

app.delete('/api/users', userController.deleteUser, (req, res) => {
  console.log("are we here");
  res.status(200).json(res.locals.user);
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
