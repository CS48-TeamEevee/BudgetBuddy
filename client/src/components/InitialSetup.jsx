import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InitialSetup.css';

function InitialSetup({ username, password }) {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState({});
  const [variableExpenses, setVariableExpenses] = useState({});
  const [savingGoal, setSavingGoal] = useState(0);
  const [investmentReturn, setInvestmentReturn] = useState(0);

  const fixedExpenseOptions = [
    'Rent',
    'Mortgage',
    'Parking',
    'Bills',
    'Subscriptions',
    'Memberships',
    'Custom',
  ];
  const variableExpenseOptions = [
    'Groceries',
    'Entertainment',
    'Dining Out',
    'Travel',
    'Custom',
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

  // const saveToDatabase = async (data) => {
  //     const uri = process.env.MONGODB_URI;
  //     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  //     try {
  //         await client.connect();
  //         const database = client.db('your_database_name');
  //         const collection = database.collection('your_collection_name');
  //         await collection.insertOne(data);
  //     } catch (error) {
  //         console.error('Error saving to database:', error);
  //     } finally {
  //         await client.close();
  //     }
  // };

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

    // await saveToDatabase(data);

    // Navigate to InitialReport component
    navigate('/initialReport', { state: data });
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
