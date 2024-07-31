const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const userController = require('./controllers/userController.js');
const setupController = require('./controllers/setupController.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.post('/api/signup', userController.createUser, (req, res) => {
  console.log('or here');
  res.status(200).json(res.locals.user);
});

app.post('/api/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.patch('/api/initialSetup', setupController.saveInitialSetup, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.get('/api/users', userController.getAllUsers, (req, res) => {
  console.log('are we here');
  res.status(200).json(res.locals.user);
});

app.delete('/api/users', userController.deleteUser, (req, res) => {
  console.log('are we here');
  res.status(200).json(res.locals.user);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
