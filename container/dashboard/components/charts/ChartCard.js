import React from "react";
import { Doughnut } from "react-chartjs-2";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Chart, registerables } from 'chart.js';
//ChartJS.register(ArcElement, Tooltip, Legend, Title);
Chart.register(...registerables);
const colArr = ["#f26c6c", "#458aeb", "#f6f976", "#78cdba", "#d184d1", "#d6a852", 'silver'];
const colArrIncome = ['#1cac88', '#2acddc', '#2a9ca6', '#55c6f3', '#7dbbc0', '#56e6c4', '#32a1e1', '#6b9659', '#43ddeb'];
const colArrBS = ['#638484', '#c4ae23', '#3380f5', '#8f4c86','#538257',   '#26cece','#8a7b1a','#405d87','#440c3d','#105516'];
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
export function DoughnutChart({name, dataArr, titleChart, titleTotal, titleAmount, lebelArr}) {
  const backgroundColor = name === "INCOME"? colArrIncome.slice(0, dataArr?.length) : 
  name === "RECEIVABLES" || name === "PAYABLES"? generateRandomColor(dataArr?.length) : colArr.slice(0, dataArr?.length);
  const data = {
    labels: lebelArr,
    datasets: [
      {
        label: "Total",
        data: dataArr,
        backgroundColor,
        borderColor:backgroundColor,
        borderWidth: 0,
        hoverOffset: 5,
        spacing:5,
      },
    ],
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
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        //padding: 10 // Adjust spacing between legends
    },
    
    
      fullWidth: false,
      toggleDatasetVisibility: false,
      onClick: null,
    },
  },
};
  return (
    <div className="w-[330px] h-[300px] p-3 cardShodow ">
      <Doughnut data={data} options={options}/>
      <p className={`text-[14px] -mt-6 pl-2 ${name==="INCOME"? 'text-[#1cac88]' : name==="RECEIVABLES" || name==="PAYABLES"? 'text-blue-800' : 'text-[#f26c6c]'}`}>{titleTotal} {titleAmount}</p>
    </div>
  );
}


export function generateRandomColor(len) {
  const getColor = ()=>{
    const letters = '0456ABC789123DEF'; //0123456789ABCDEF scattered
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  const newColors = [];
  for (let i = 0; i < len; i++) {
    newColors.push(getColor());
  }
  return newColors
}

/*
  const options = {
    responsive: true,
    resizeDelay: 500,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        xAlign: 'center',
        yAlign: 'bottom',
        backgroundColor: '#000000',
        displayColors: false,
        bodyAlign: 'center',
        callbacks: {
          beforeBody: (context) => {
            console.log('before body: ', context)
            return 'before body'
          },
          title: (context) => {
            console.log('title context: ', context)
            return 'title'
          },
          beforeLabel: (context) => {
            console.log('before label: ', context)
            return 'before label'
          },
          label: (context) => {
            console.log('label context', context)
            return 'label'
          },
        },
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  */
