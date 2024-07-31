import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InitialSetup.css';

function InitialSetup({ username, password }) {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState();
  const [fixedExpenses, setFixedExpenses] = useState({});
  const [variableExpenses, setVariableExpenses] = useState({});
  const [savingGoal, setSavingGoal] = useState();
  const [investmentReturn, setInvestmentReturn] = useState();

  const fixedExpenseOptions = [
    'Rent',
    'Mortgage',
    'Parking',
    'Bills',
    'Subscriptions',
    'Memberships',
  ];
  const variableExpenseOptions = [
    'Groceries',
    'Entertainment',
    'Dining Out',
    'Travel',
    'Pets',
  ];

  const navigate = useNavigate();

  const handleAddFixedExpense = (expense) => {
    setFixedExpenses({ ...fixedExpenses, [expense]: '' });
  };

  const handleAddVariableExpense = (expense) => {
    setVariableExpenses({ ...variableExpenses, [expense]: '' });
  };

  const handleFixedExpenseChange = (type, amount) => {
    setFixedExpenses({ ...fixedExpenses, [type]: amount });
  };

  const handleVariableExpenseChange = (type, amount) => {
    setVariableExpenses({ ...variableExpenses, [type]: amount });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const monthlyUpdate = {
      month,
      income,
      expenses: {
        fixedExpenses,
        variableExpenses,
      },
    };
  
    const data = {
      username,
      password,
      savingGoal,
      investmentReturn,
      monthlyUpdates: [monthlyUpdate],
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/initial-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save initial setup data');
      }
  
      const result = await response.json();
  
      // Navigate to InitialReport component
      navigate('/report', { state: result });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div className='form-group'>
        <label>Current Month/Year (MM/YYYY):</label>
        <input
          type='text'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder='MM/YYYY'
        />
      </div>

      <div className='form-group'>
        <label>Estimated Monthly Income:</label>
        <input
          type='number'
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
        />
      </div>

      <div className='form-group'>
        <label>Fixed Expenses:</label>
        <select onChange={(e) => handleAddFixedExpense(e.target.value)}>
          <option value=''>Select an expense</option>
          {fixedExpenseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {Object.keys(fixedExpenses).map((type) => (
          <div key={type} className='form-group'>
            <label>{type}:</label>
            <input
              type='number'
              value={fixedExpenses[type]}
              onChange={(e) => handleFixedExpenseChange(type, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className='form-group'>
        <label>Variable Expenses:</label>
        <select onChange={(e) => handleAddVariableExpense(e.target.value)}>
          <option value=''>Select an expense</option>
          {variableExpenseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {Object.keys(variableExpenses).map((type) => (
          <div key={type} className='form-group'>
            <label>{type}:</label>
            <input
              type='number'
              value={variableExpenses[type]}
              onChange={(e) =>
                handleVariableExpenseChange(type, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <div className='form-group'>
        <label>Savings Goals:</label>
        <div className='form-group'>
          <label>5-Year Savings Target ($):</label>
          <input
            type='number'
            value={savingGoal}
            onChange={(e) => setSavingGoal(Number(e.target.value))}
          />
        </div>
        <div className='form-group'>
          <label>
            Estimated Savings Yield/Investment Return as annualized %:
          </label>
          <input
            type='number'
            value={investmentReturn}
            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
          />
        </div>
      </div>

      <button type='submit' className='submit-button'>
        Submit
      </button>
    </form>
  );
}

export default InitialSetup;
