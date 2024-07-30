import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import '../styles/InitialReport.css';

Chart.register(...registerables);

function InitialReport() {
    const location = useLocation();
    const { estMonthlyIncome, fixedExpenses, variableExpenses, savingsTarget, savingsReturn, startingMonth } = location.state;

    const [estimatedMonthlySavings, setEstimatedMonthlySavings] = useState(0);

    useEffect(() => {
        const totalFixedExpenses = Object.values(fixedExpenses).reduce((acc, val) => acc + Number(val), 0);
        const totalVariableExpenses = Object.values(variableExpenses).reduce((acc, val) => acc + Number(val), 0);
        const savings = estMonthlyIncome - totalFixedExpenses - totalVariableExpenses;
        setEstimatedMonthlySavings(savings);

        // Prepare data for Pie Chart
        const pieLabels = [...Object.keys(fixedExpenses), ...Object.keys(variableExpenses), 'Estimated Monthly Savings'];
        const pieData = [...Object.values(fixedExpenses).map(Number), ...Object.values(variableExpenses).map(Number), savings];
        
        // Generate unique colors for each piece
        const pieColors = pieLabels.map((_, index) => `hsl(${index * 360 / pieLabels.length}, 70%, 50%)`);

        // Pie Chart
        const pieCtx = document.getElementById('expensesPieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [{
                    data: pieData,
                    backgroundColor: pieColors,
                }],
            },
        });

        // Line Chart
        const lineCtx = document.getElementById('savingsLineChart').getContext('2d');
        const months = 12 * 5;
        const monthlyRate = (1 + savingsReturn / 100) ** (1 / 12) - 1;
        const savingsData = Array.from({ length: months + 1 }, (_, i) => savings * (1 + monthlyRate) ** i);
                
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 6 }, (_, i) => {
                    const date = new Date(startingMonth.split('/')[1], startingMonth.split('/')[0] - 1);
                    date.setFullYear(date.getFullYear() + i);
                    return date.toLocaleDateString('en-US', { year: 'numeric' });
                }),
                datasets: [{
                    label: 'Savings Over Time',
                    data: savingsData.filter((_, i) => i % 12 === 0),
                    borderColor: '#36A2EB',
                    fill: false,
                }],
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
    }, [estMonthlyIncome, fixedExpenses, variableExpenses, savingsReturn, startingMonth]);

    return (
        <div className="report-container">
            <div className="left-column">
                <h2>Your estimated monthly savings: ${estimatedMonthlySavings.toFixed(2)}</h2>
                <canvas id="expensesPieChart"></canvas>
            </div>
            <div className="right-column">
                <canvas id="savingsLineChart"></canvas>
            </div>
        </div>
    );
}

export default InitialReport;