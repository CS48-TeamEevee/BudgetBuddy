import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import '../styles/Report.css';

Chart.register(...registerables);

function Report() {
  const location = useLocation();
  const { username } = location.state;

  const [estimatedMonthlySavings, setEstimatedMonthlySavings] = useState(0);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    console.log('are we in useeffect');

    const apiCall = `http://localhost:3000/api/users/${username}`;
    fetch(apiCall, {
      method: 'GET', // Changed from POST to PATCH
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) =>
      result.json().then((user) => {
        console.log(user);
        const { savingGoal, investmentReturn, monthlyUpdates } = user;
        const { month, income, expenses } = monthlyUpdates[0];
        const { fixedExpenses, variableExpenses } = expenses;
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

        // Filter out null or undefined values from fixedExpenses and variableExpenses
        const filteredFixedExpenses = Object.entries(fixedExpenses).filter(
          ([, value]) => value != null
        );
        const filteredVariableExpenses = Object.entries(
          variableExpenses
        ).filter(([, value]) => value != null);

        // Prepare data for Pie Chart
        const pieLabels = [
          ...filteredFixedExpenses.map(([key]) => key),
          ...filteredVariableExpenses.map(([key]) => key),
          'Estimated Monthly Savings',
        ];
        const pieData = [
          ...filteredFixedExpenses.map(([, value]) => Number(value)),
          ...filteredVariableExpenses.map(([, value]) => Number(value)),
          savings,
        ];

        // Generate unique colors for each piece
        const pieColors = pieLabels.map(
          (_, index) => `hsl(${(index * 360) / pieLabels.length}, 70%, 50%)`
        );

        // Destroy previous pie chart instance if it exists
        if (pieChartRef.current) {
          pieChartRef.current.destroy();
        }

        // Create new pie chart instance
        const pieCtx = document
          .getElementById('expensesPieChart')
          .getContext('2d');
        pieChartRef.current = new Chart(pieCtx, {
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
        // const months = 12 * 5;
        // const lineLabels = Array.from({ length: 6 }, (_, i) => {
        //   const date = new Date(month.split('/')[1], month.split('/')[0] - 1);
        //   date.setFullYear(date.getFullYear() + i);
        //   return date.toLocaleDateString('en-US', { year: 'numeric' });
        // });
        // const lineData = [0, savingGoal];

        const year = month.split('/')[1];
        // const lineData = [0, savingGoal];
        const years = [];
        for (let i = 0; i < 6; i++) {
          years.push(year + i);
        }

        // Destroy previous line chart instance if it exists
        if (lineChartRef.current) {
          lineChartRef.current.destroy();
        }

        // Create new line chart instance
        lineChartRef.current = new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: years,
            datasets: [
              {
                label: 'Intended Savings Growth',
                data: [
                  {x: years[0], y: 0},
                  {x: years[5], y: savingGoal},
                ],
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
      })
    );
  }, [username]);

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
        <div className='button-container'>
        <button className='add-monthly-update-button'>
          Add Monthly Update
        </button>
      </div>
      </div>
    </div>
  );
}

export default Report;
