import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpensesForm from './ExpensesForm.jsx';

function MonthlyUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, monthlyUpdates } = location.state;

    const lastMonthlyUpdate = monthlyUpdates[monthlyUpdates.length - 1];

    const [monthYear, setMonthYear] = useState('');
    const [income, setIncome] = useState('');
    const [updateFixedExpenses, setUpdateFixedExpenses] = useState(false);
    const [updateVariableExpenses, setUpdateVariableExpenses] = useState(false);
    const [fixedExpenses, setFixedExpenses] = useState(lastMonthlyUpdate.expenses.fixedExpenses);
    const [variableExpenses, setVariableExpenses] = useState(lastMonthlyUpdate.expenses.variableExpenses);

    const fixedExpenseOptions = ['Rent', 'Mortgage', 'Parking', 'Bills', 'Subscriptions', 'Memberships', 'Custom'];
    const variableExpenseOptions = ['Groceries', 'Entertainment', 'Dining Out', 'Travel', 'Custom'];

    const handleFixedExpenseChange = (type, amount) => {
        setFixedExpenses({ ...fixedExpenses, [type]: amount });
    };

    const handleVariableExpenseChange = (type, amount) => {
        setVariableExpenses({ ...variableExpenses, [type]: amount });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMonthlyUpdate = {
            month: monthYear,
            income: parseFloat(income),
            expenses: {
                fixedExpenses: updateFixedExpenses ? fixedExpenses : lastMonthlyUpdate.expenses.fixedExpenses,
                variableExpenses: updateVariableExpenses ? variableExpenses : lastMonthlyUpdate.expenses.variableExpenses,
            },
        };

        // Here you would typically make an API call to update the database
        // For example:
        // updateUserMonthlyUpdates(username, newMonthlyUpdate);

        // Navigate back to the InitialReport or another appropriate page
        navigate('/initial-report', { state: { username, monthlyUpdates: [...monthlyUpdates, newMonthlyUpdate] } });
    };

    return (
        <div className="monthly-update-container">
            <h2>Monthly Update</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Current month/year (MM/YYYY):</label>
                    <input
                        type="text"
                        value={monthYear}
                        onChange={(e) => setMonthYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>What was your total income for the month?</label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Do you want to update your fixed expenses for the month?</label>
                    <button type="button" onClick={() => setUpdateFixedExpenses(!updateFixedExpenses)}>
                        Update
                    </button>
                </div>
                {updateFixedExpenses && (
                    <ExpensesForm
                        expenses={fixedExpenses}
                        handleExpenseChange={handleFixedExpenseChange}
                        expenseOptions={fixedExpenseOptions}
                        title="Fixed Expenses"
                    />
                )}
                <div>
                    <label>Do you want to update your variable expenses for the month?</label>
                    <button type="button" onClick={() => setUpdateVariableExpenses(!updateVariableExpenses)}>
                        Update
                    </button>
                </div>
                {updateVariableExpenses && (
                    <ExpensesForm
                        expenses={variableExpenses}
                        handleExpenseChange={handleVariableExpenseChange}
                        expenseOptions={variableExpenseOptions}
                        title="Variable Expenses"
                    />
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MonthlyUpdate;