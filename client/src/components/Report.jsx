import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import '../styles/Report.css';

Chart.register(...registerables);

function Report() {
  const location = useLocation();
  const { username, password, savingGoal, investmentReturn, monthlyUpdates } =
    location.state;
  const { month, income, expenses } = monthlyUpdates[0];
  const { fixedExpenses, variableExpenses } = expenses;

  const [estimatedMonthlySavings, setEstimatedMonthlySavings] = useState(0);

  useEffect(() => {
    const totalFixedExpenses = Object.values(fixedExpenses).reduce(
      (acc, val) => acc + Number(val),
      0
    );
    const totalVariableExpenses = Object.values(variableExpenses).reduce(
      (acc, val) => acc + Number(val),
      0
    );
    const savings = income - totalFixedExpenses - totalVariableExpenses;
    setEstimatedMonthlySavings(savings);

    // Prepare data for Pie Chart
    const pieLabels = [
      ...Object.keys(fixedExpenses),
      ...Object.keys(variableExpenses),
      'Estimated Monthly Savings',
    ];
    const pieData = [
      ...Object.values(fixedExpenses).map(Number),
      ...Object.values(variableExpenses).map(Number),
      savings,
    ];

    // Generate unique colors for each piece
    const pieColors = pieLabels.map(
      (_, index) => `hsl(${(index * 360) / pieLabels.length}, 70%, 50%)`
    );
    // Pie Chart
    const pieCtx = document.getElementById('expensesPieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: pieColors,
          },
        ],
      },
    });

    // Line Chart
    const lineCtx = document
      .getElementById('savingsLineChart')
      .getContext('2d');
    const months = 12 * 5;
    const lineLabels = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(month.split('/')[1], month.split('/')[0] - 1);
      date.setFullYear(date.getFullYear() + i);
      return date.toLocaleDateString('en-US', { year: 'numeric' });
    });
    const lineData = [0, savingGoal];

    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: lineLabels,
        datasets: [
          {
            label: 'Savings Progress',
            data: lineData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amount Saved ($)',
            },
          },
        },
      },
    });
  }, [
    income,
    fixedExpenses,
    variableExpenses,
    savingGoal,
    investmentReturn,
    month,
  ]);

  return (
    <div className='report-container'>
      <div className='left-column'>
        <h2>
          Your estimated monthly savings: ${estimatedMonthlySavings.toFixed(2)}
        </h2>
        <canvas id='expensesPieChart'></canvas>
      </div>
      <div className='right-column'>
        <canvas id='savingsLineChart'></canvas>
      </div>
      <div className='button-container'>
        {/* <button className="add-monthly-update-button" onClick={handleAddMonthlyUpdate}>
                    Add Monthly Update
                </button> */}
        <button className='add-monthly-update-button'>
          Add Monthly Update
        </button>
      </div>
    </div>
  );
}

export default Report;
