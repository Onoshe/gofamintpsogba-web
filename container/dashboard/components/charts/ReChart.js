import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";


const data01 = [
  { name: "Group A", value: 400, fill:'red', stroke:'blue', isAnimationActive:true},
  { name: "Group B", value: 300, fill:'green' },
  { name: "Group C", value: 300,  fill:'blue', },
  { name: "Group D", value: 200, fill:'orange', },
  { name: "Group E", value: 278,  fill:'purple', },
  { name: "Group F", value: 189, fill:'magenta', },

];

const data02 = [
  { name: "Group A", value: 2400, fill:'red', },
  { name: "Group B", value: 4567, fill:'green', },
  { name: "Group C", value: 1398, fill:'blue', },
  { name: "Group D", value: 9800, fill:'orange', },
  { name: "Group E", value: 3908, fill:'purple', },
  { name: "Group F", value: 4800, fill:'magenta', }
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  return (
    <path
      d={`M${cx} ${cy} L${cx + (outerRadius + 10) * Math.cos(startAngle)} ${cy + (outerRadius + 10) * Math.sin(startAngle)} A${outerRadius + 10} ${outerRadius + 10} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 1 ${cx + (outerRadius + 10) * Math.cos(endAngle)} ${cy + (outerRadius + 10) * Math.sin(endAngle)} z`}
      fill={fill}
      stroke="white"
      strokeWidth={2}
    />
  );
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel_99 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel = ({ cx, cy, midAngle, payload, innerRadius, outerRadius, percent, index }) => {
    const radius = outerRadius + 10; // Add some offset to move the label away from the arc
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fontSize={12} fill="blue" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${payload.name}: ${payload.value}`}
      </text>
    );
  };

export default function ReChart() {
  return (
    <PieChart width={700} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={100}
        fill="#8884d8"
        label={renderCustomizedLabel}
        //activeShape={renderActiveShape}
        //label
      />
      <Pie
        dataKey="value"
        data={data02}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
      <Tooltip />
      
      <Legend 
        align="left"
        width={180} 
        wrapperStyle={{ 
            paddingLeft: 20,
            fontSize:12,
            top: 40, 
            right: 20, 
            backgroundColor: '#f5f5f5', 
            border: '1px solid #d5d5d5', 
            borderRadius: 3, 
            verticalAlign:"left",
            //layout:"horizontal",
            lineHeight: '40px' }} 
        //payload={data01}
        payload={data01.map((dt)=>{return { value: dt.name+'-$'+dt.value, type: 'square', color: dt.fill }})}
        />
    </PieChart>
  );
}
