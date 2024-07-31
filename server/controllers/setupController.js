const mongoose = require('mongoose');
const User = require('../models/userModel'); // Adjust the path to your User model

const setupController = {};

setupController.saveInitialSetup = async (req, res, next) => {
  try {
    const { username, savingGoal, investmentReturn, monthlyUpdates } = req.body;
    console.log("in saveInitialSetup middleware; monthlyUpdates:", monthlyUpdates);
    console.log("fixedExpenses:", monthlyUpdates[0].expenses.fixedExpenses);

    // Find the user by username
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
    console.log("res.locals.user:", user);
    console.log("fixed expenses from res.locals.user:", user.monthlyUpdates[0].expenses.fixedExpenses);
    return next();
  } catch (err) {
    return next({
      log: `Error in saveInitialSetup: ${err}`,
      status: 500,
      message: { err: 'An error occurred while saving initial setup data' },
    });
  }
};

module.exports = setupController;