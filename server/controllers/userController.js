const jwt = require('jsonwebtoken'); // Import jsonwebtoken library for JWT creation/validation
const JWT_SECRET = process.env.JWT_SECRET; // Define a secret key for signing JWTs
const userController = {}; // Initialize an empty userController object
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

userController.createUser = async (req, res, next) => {
  //destructure req.body for the username and password
  const { username, password } = req.body;
  console.log('are we here');
  //if one does not exists, call global error handler
  if (!username || !password) {
    console.log('something missing');
    return next({
      log: 'Error in userController.createUser',
      message: { err: 'Did not receive username and password' },
    });
  }

  try {
    //generate hashed password to securely store data
    const userSalt = await bcrypt.genSalt();
    const hashword = await bcrypt.hash(password, userSalt);

    //store user in database
    User.create({ username: username, password: hashword })
      .then((result) => {
        console.log('did we make it');
        res.locals.user = result;
        next();
      })
      .catch((err) => {
        next({
          log: 'Error in UserController.createUser',
          status: 400,
          message: {
            err: 'Username already exists',
          },
        });
      });
  } catch (err) {
    return next({
      log: 'Error in userController.createUser',
      message: { err: 'Could not create new user' },
    });
  }
};

//FOR TESTING PURPOSES
userController.deleteUser = async (req, res, next) => {
  const { username } = req.body;
  console.log(req.body);

  User.findOneAndDelete({ username: username }).then((result) => {
    //if no user was found with provided input, call global error handler
    if (!result) {
      next({
        log: 'Error in UserController.deleteUser',
        status: 400,
        message: {
          err: 'No user in database matches name provided. Cannot delete.',
        },
      });
    }
    //if user found, store user onto res.locals for response
    res.locals.user = result;
    next();
  });
};

//FOR TESTING PURPOSES
userController.getAllUsers = async (req, res, next) => {
  res.locals.user = await User.find({});
  next();
};

//TODO - write findone 
userController.verifyUser = async (req, res, next) => {
  //destructure req.body for the username and password
  const { username, password } = req.body;
  //query database for a user by username
  //get that users password stored in database

  //if user does not exist return null
  try {
    User.find({}, (err, users) => {
      if (err) {
        res.redirect('/login');
      }
    });

    const correctLogin = await bcrypt.compare(password, user.password);
    res.locals.user = correctLogin
      ? 'Successfully logged in'
      : 'Passwords do not match';

    //jwt.sign(user);

    return next();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = userController;
