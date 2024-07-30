const mongoose = require('mongoose');
const expensesSchema = require('./expenseModel').schema; // Import the schema definition

const monthlyUpdateSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: expensesSchema,
    required: true,
  },
});

const MonthlyUpdate = mongoose.model('MonthlyUpdate', monthlyUpdateSchema);

module.exports = MonthlyUpdate;
