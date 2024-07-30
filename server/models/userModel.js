const mongoose = require('mongoose');
const monthlyUpdateSchema = require('./monthlyUpdateModel').schema; // Import the schema definition

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savingGoal: {
    type: Number,
    required: false,
  },
  investmentReturn: {
    type: Number,
    required: false,
  },
  monthlyUpdates: [monthlyUpdateSchema], // Array of MonthlyUpdate schemas
});

const User = mongoose.model('User', userSchema);

module.exports = User;
