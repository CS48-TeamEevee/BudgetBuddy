const mongoose = require('mongoose');
const User = require('../models/userModel'); // Adjust the path to your User model

const saveInitialSetup = async (req, res, next) => {
  try {
    const { username, password, savingGoal, investmentReturn, monthlyUpdates } = req.body;

    // Find the user by username and password
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's initial setup data
    user.savingGoal = savingGoal;
    user.investmentReturn = investmentReturn;
    user.monthlyUpdates = monthlyUpdates;

    await user.save();

    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in saveInitialSetup: ${err}`,
      status: 500,
      message: { err: 'An error occurred while saving initial setup data' },
    });
  }
};

module.exports = { saveInitialSetup };