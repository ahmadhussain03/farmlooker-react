import React from 'react'
import { Line } from 'react-chartjs-2' 

const PrimaryColor = "rgb(255, 156, 0)"						 

let width, height, gradient;
const getGradient = (ctx, chartArea) => {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.3, 'rgba(255, 156, 0, 0.1)');
    gradient.addColorStop(0.7, 'rgba(255, 156, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 156, 0, 0.5)');
  }

  return gradient;
}

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const data = {
  labels: labels,
  datasets: [{
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
    fill: true,
    borderColor: PrimaryColor,
    tension: 0.1,
  }]
};

const options = { 
    responsive: true,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
    plugins: {
        legend: {
            display: false
        },
        filler: {
            propagate: true
        }
    },
    elements: {
        line: {
            backgroundColor: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;

                if (!chartArea) {
                // This case happens on initial chart load
                    return null;
                }
                return getGradient(ctx, chartArea);
            },
            // backgroundColor: 'blue'
        },
        point: {
            radius: 0
        }
    }
}

const ExpenseChart = () => {
    return (
        <Line data={data} options={options} 
        className="w-full"
        />
    )
}

export default ExpenseChart
