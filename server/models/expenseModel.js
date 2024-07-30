const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  fixedExpenses: {
    RTCCertificateent: Number,
    Mortgage: Number,
    Parking: Number,
    Bills: Number,
    Memberships: Number,
    Subscriptions: Number,
    Custom: Number,
  },
  variableExpenses: {
    Groceries: Number,
    Entertainment: Number,
    DiningOut: Number,
    Travel: Number,
    Custom: Number,
  },
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;

// const fixedExpenseOptions = ['Rent', 'Mortgage', 'Parking', 'Bills', 'Subscriptions', 'Memberships', 'Custom'];
//     const variableExpenseOptions = ['Groceries', 'Entertainment', 'Dining Out', 'Travel', 'Custom'];
