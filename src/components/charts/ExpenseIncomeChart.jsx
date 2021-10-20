import React, { useEffect, useCallback } from 'react'
import { Bar } from 'react-chartjs-2' 

import axios from '../../utils/axios';
import { useState } from 'react';

const PrimaryColor = "rgb(255, 156, 0)"						 

// let width, height, gradient;
// const getGradient = (ctx, chartArea) => {
//   const chartWidth = chartArea.right - chartArea.left;
//   const chartHeight = chartArea.bottom - chartArea.top;
//   if (gradient === null || width !== chartWidth || height !== chartHeight) {
//     // Create the gradient because this is either the first render
//     // or the size of the chart has changed
//     width = chartWidth;
//     height = chartHeight;
//     gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
//     gradient.addColorStop(0, 'transparent');
//     gradient.addColorStop(0.3, 'rgba(255, 156, 0, 0.1)');
//     gradient.addColorStop(0.7, 'rgba(255, 156, 0, 0.3)');
//     gradient.addColorStop(1, 'rgba(255, 156, 0, 0.5)');
//   }

//   return gradient;
// }

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', "Dec"];

const options = { 
    responsive: true,
    // barThickness: 6,
    scales: {
        // y: {
        //     display: false
        // },
        x: {
            grid: {
                display: false,
                drawBorder: false
            },
        }
    },
    plugins: {
        legend: {
            display: false
        },
    }
}

const ExpenseIncomeChart = () => {

    const [incomeData, setIncomeData] = useState([])
    const [expenseData, setExpenseData] = useState([])

    const getExpenseIncomeChartData = useCallback(async () => {
        
        let response = await axios.get("home/income_chart")

        let monthData = labels.map((mon, index) => {
            let monthIndex = response.data.data.findIndex(d => d.month === index + 1)

            if(monthIndex !== -1){
                return response.data.data[monthIndex].price
            } else {
                return 0;
            }
        })

        setIncomeData(monthData)
        
        response = await axios.get("home/expense_chart")

        let expenseMonthData = labels.map((mon, index) => {
            let monthIndex = response.data.data.findIndex(d => d.month === index + 1)

            if(monthIndex !== -1){
                return response.data.data[monthIndex].price
            } else {
                return 0;
            }
        })

        setExpenseData(expenseMonthData)
    }, [])

    useEffect(() => {
        getExpenseIncomeChartData()
    }, [])

    return (
        <Bar data={{
            labels: labels,
            datasets: [
                {
                    label: 'Expense',
                    data: expenseData,
                    fill: true,
                    borderColor: PrimaryColor,
                    backgroundColor: PrimaryColor,
                    tension: 0.1,
                },
                {
                    label: 'Income',
                    data: incomeData,
                    fill: true,
                    borderColor: PrimaryColor,
                    backgroundColor: 'green',
                    tension: 0.1,
                },
            ]
          }} options={options} 
        className="w-full"
        />
    )
}

export default ExpenseIncomeChart
