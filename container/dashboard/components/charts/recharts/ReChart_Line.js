'use client'
import { formatToCurrency } from "@/lib/currency";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, LineChart, Line, YAxis, XAxis, CartesianGrid } from "recharts";


export default function ReChart_Line({label,titleChart, contDimen, titleChartSub, incomeData, expensesData}) {
   const {width, height} = contDimen;
  
  const dimens = {
    width: width < 400? 300 : width > 800? 700 : width - 30,
    height:250
  };

  /*switch (width) {
    case width < 400:
      dimens.width = 300
      break;
      case width >= 400 && width < 500:
        dimens.width = 400
        break;
      case width >= 500 && width < 700:
        dimens.width = 500
        break;
    default: dimens.width = 600
      break;
  }*/

  const dataMap = label?.map((dt, i)=>{
    const income = Math.floor(incomeData[i]);
    const expenses = Math.floor(expensesData[i]);
    const net = income - expenses;
    const isProfit = income > expenses;
    return {
      name: dt,
      Income: Math.floor(incomeData[i]),
      Expenses: Math.floor(expensesData[i]),
      net,
      isProfit
    }
  });

  
  //console.log(dataMap)
  const CustomTooltip = ({ active, payload, label }) => {
    //console.log(payload, label)
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80  text-[13px] border border-white rounded-md py-2 px-3 flex flex-col flex-wrap">
          <p className="text-white px-1 pb-2 font-[500]">{`${label}`}</p>
          <p className="flex flex-row items-center">
              <span className={`w-7 h-3 border border-white mr-2`}
                style={{backgroundColor:payload[0].color}}>
              </span>
              <span className="text-white">{payload[0].dataKey} ${formatToCurrency(payload[0].value)}</span>
          </p>
          <p className="flex flex-row items-center">
              <span className={`w-7 h-3 border border-white mr-2`}
                style={{backgroundColor:payload[1].color}}>
              </span>
              <span className="text-white">{payload[1].dataKey} ${formatToCurrency(payload[1].value)}</span>
          </p>
          <p className="flex flex-row items-center hidden">
              <span className={`w-7 h-3  mr-2 text-white font-bold`}
                >NET
              </span>
              <span className="text-white"
                style={{color:payload[0].isProfit? "lime" : "red"}}>{payload[0].isProfit? "Net Profit" : "Net Loss"} ${formatToCurrency(payload[0].net)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cardShodow">
        <p className="text-center p-3 pt-7 text-[14px] font-[500] text-purple-900">{titleChart}</p>
        <LineChart width={dimens.width} data={dataMap} height={dimens.height}
          
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fontSize: 12 }}/>
          <YAxis  style={{ fontSize: 12 }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="rect"/>
          <Line type="monotone" dataKey="Income" stroke="rgba(75, 192, 192, 1)" strokeWidth={2}/>
          <Line type="monotone" dataKey="Expenses" stroke="rgba(255, 99, 132, 1)" strokeWidth={2}/>
        </LineChart>
    </div>
  );
}
