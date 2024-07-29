import React, { useState } from 'react';
import './InitialSetup.css';

function InitialSetup() {
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [fixedExpenses, setFixedExpenses] = useState([]);
    const [variableExpenses, setVariableExpenses] = useState([]);
    const [savingsGoals, setSavingsGoals] = useState({ target: '', yield: '' });

    const fixedExpenseOptions = ['Rent', 'Mortgage', 'Parking', 'Bills', 'Subscriptions', 'Memberships', 'Custom'];
    const variableExpenseOptions = ['Groceries', 'Entertainment', 'Dining Out', 'Travel', 'Custom'];

    const handleAddFixedExpense = (expense) => {
        setFixedExpenses([...fixedExpenses, { type: expense, amount: '' }]);
    };

    const handleAddVariableExpense = (expense) => {
        setVariableExpenses([...variableExpenses, { type: expense, amount: '' }]);
    };

    const handleFixedExpenseChange = (index, amount) => {
        const newExpenses = [...fixedExpenses];
        newExpenses[index].amount = amount;
        setFixedExpenses(newExpenses);
    };

    const handleVariableExpenseChange = (index, amount) => {
        const newExpenses = [...variableExpenses];
        newExpenses[index].amount = amount;
        setVariableExpenses(newExpenses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            monthlyBudget,
            fixedExpenses,
            variableExpenses,
            savingsGoals,
        };

        // Assuming you have a function to save data to MongoDB
        await saveToDatabase(data);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label>Monthly Budget:</label>
                <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Fixed Expenses:</label>
                <select onChange={(e) => handleAddFixedExpense(e.target.value)}>
                    <option value="">Select an expense</option>
                    {fixedExpenseOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {fixedExpenses.map((expense, index) => (
                    <div key={index} className="form-group">
                        <label>{expense.type}:</label>
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleFixedExpenseChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="form-group">
                <label>Variable Expenses:</label>
                <select onChange={(e) => handleAddVariableExpense(e.target.value)}>
                    <option value="">Select an expense</option>
                    {variableExpenseOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {variableExpenses.map((expense, index) => (
                    <div key={index} className="form-group">
                        <label>{expense.type}:</label>
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleVariableExpenseChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="form-group">
                <label>Savings Goals:</label>
                <div className="form-group">
                    <label>5-Year Savings Target ($):</label>
                    <input
                        type="number"
                        value={savingsGoals.target}
                        onChange={(e) => setSavingsGoals({ ...savingsGoals, target: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Estimated Savings Yield/Investment Return as annualized %:</label>
                    <input
                        type="number"
                        value={savingsGoals.yield}
                        onChange={(e) => setSavingsGoals({ ...savingsGoals, yield: e.target.value })}
                    />
                </div>
            </div>

            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
}

export default InitialSetup;