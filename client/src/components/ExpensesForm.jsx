import React from 'react';

function ExpensesForm({
  expenses,
  handleExpenseChange,
  expenseOptions,
  title,
}) {
  return (
    <div className='form-group'>
      <label>{title}:</label>
      <select onChange={(e) => handleExpenseChange(e.target.value)}>
        <option value=''>Select an expense</option>
        {expenseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {Object.keys(expenses).map((type) => (
        <div key={type} className='form-group'>
          <label>{type}:</label>
          <input
            type='number'
            value={expenses[type]}
            onChange={(e) => handleExpenseChange(type, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default ExpensesForm;
