import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Chart, registerables } from 'chart.js';
import { formatToCurrency } from "@/lib/currency";
//ChartJS.register(ArcElement, Tooltip, Legend, Title);
Chart.register(...registerables);





const colArr = ["#f26c6c", "#458aeb", "#f6f976", "#78cdba", "#d184d1", "#d6a852", 'silver'];
export const data = {
  labels: ["Red- 20,000", "Blue-Transportation to Lagos", "Yellow", "Green", "Purple", "Orange-50,000", "Silver"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 20, 3, 5, 2, 3, 8],
      backgroundColor: colArr,
      borderColor: colArr,
      borderWidth: 0,
      hoverOffset: 5,
      spacing:5,
    },
  ],
  //hoverOffset:
  //rotation:10,
};



//Total Expenses: $25,000.00 //[12, 20, 3, 5, 2, 3, 8] "Expenses summary"
export function ChartProfit({name, titleChart, titleChartSub, incomeData,  expensesData, label,incomeExpRef, total1, total2}) {
  const data = {
    labels:label, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
          label: 'Income',
          data: incomeData, //[12000, 15000, 13000, 17000, 18000, 19000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.1
      },
      {
          label: 'Expenses',
          data: expensesData, //[8000, 9000, 7000, 11000, 12000, 10000],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          tension: 0.1
      }
   ]
    //hoverOffset:
    //rotation:10,
  };

  const options = {
  responsive: true,
  rotation:360,
  //resizeDelay: 500,
  scales: {
    y: {
      display: false,
      beginAtZero:true
    },
  },
  plugins: {
    title: {
      display: true,
      fontColor: "red",
      fontSize: 10,
      fontStyle: "bold",
      position: "top",
      text: titleChart,
    },
    subtitle: {
      display: true,
      text: titleChartSub
    },
    
    legend: {
      display: true,
      position: "top",
      align: "center",
      labels: {
        padding: 10 // Adjust spacing between legends
    },
    legendMargin:{

    },
    
      fullWidth: false,
      toggleDatasetVisibility: false,
      onClick: null,
    },
  },
};
  return (
    <div className="w-[350px] h-[250px] p-3 cardShodow">
      <Line ref={incomeExpRef} data={data} options={options}/>      
    </div>
  );
}
