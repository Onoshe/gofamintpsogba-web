import { formatToCurrency } from "@/lib/currency";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";


const data019 = [
  { name: "Group A", value: 400, fill:'red', isAnimationActive:true},
  { name: "Group B", value: 300, fill:'green' },
  { name: "Group C", value: 300,  fill:'blue', },
  { name: "Group D", value: 200, fill:'orange', },
  { name: "Group E", value: 278,  fill:'purple', },
  { name: "Group F", value: 189, fill:'magenta', },

];

const colArr = ["#f26c6c", "#458aeb", "#f6f976", "#78cdba", "#d184d1", "#d6a852", 'silver'];
const colArrIncome = ['#1cac88', '#2acddc', '#32a1e1', '#9b9699',  '#77a6aa', '#7dbbc0', '#56e6c4'];
const colArrBS = ['#638484', '#c4ae23', '#3380f5', '#8f4c86','#538257',  '#26cece','#8a7b1a','#405d87','#440c3d','#105516'];

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




export default function ReChart({dataArr, lebelArr, titleChart, titleTotal, name, contDimen, titleAmount, cu}) {
  const {width, height} = contDimen;

  const data = lebelArr?.map((dt, i)=>{
    return {name:dt, value:Math.abs(dataArr[i]), fill:name==="INCOME"? colArrIncome[i] : name==="BS"? colArrBS[i] : colArr[i]}
  })
  const dimensSsm = {
    wdt:300,
    hgt:420,
    cx:250/2,
    cy:100,
    or:80,
    ir:35,
    leg:{
      wdt:"90%",
      t:200,
      l:10,
      pt:5,
      pb:10,
      pl:20,
      ft:10,
    },
        bTextStyle:'pb-5'
  };

  const dimensLg = {
    wdt:550,
    hgt:250,
    cx:250/2,
    cy:100,
    or:100,
    ir:60,
    leg:{
      wdt:300,
      t:20,
      r:5,
      pt:5,
      pb:10,
      pl:20,
      ft:11,
      slice:30,
    },
    bTextStyle:'pb-5 -mt-10'
  };

  const dimensMd = {
    wdt:450,
    hgt:250,
    cx:220/2,
    cy:100,
    or:80,
    ir:40,
    leg:{
      wdt:250,
      t:20,
      r:5,
      pt:5,
      pb:10,
      pl:20,
      ft:11,
      slice:20,
    },
    bTextStyle:'pb-5 -mt-10'
  };


  const dimensSm = {
    wdt:350,
    hgt:250,
    cx:130/2,
    cy:100,
    or:65,
    ir:30,
    leg:{
      wdt:210,
      t:20,
      r:5,
      pt:5,
      pb:10,
      pl:10,
      ft:10,
      slice:20,
    },
    bTextStyle:'pb-5 -mt-10'
  };
  
  
  let dimens = width < 350? dimensSsm : width >= 350 && width <450? dimensSm : width >= 450 && width < 550? dimensMd : dimensLg;

 
  //console.log(width, dimens);

  const getValue =(dt)=>{
    if(!dt?.name && dt?.value) return "";
    const {name, value} = dt;
    const resName = name.length > dimens.leg.slice? name.slice(0,dimens.leg.slice)+"... " : name+" ";
    return resName+(name.length < dimens.leg.slice/2? "      -":"")+cu+formatToCurrency(value)
  }
  const CustomTooltip = ({ active, payload, label }) => {
    //console.log(payload, label)
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80  text-[12px] border border-white rounded-md max-w-[200px] flex flex-row flex-wrap">
          <p className="text-white px-2 pt-1 font-[500]">{`${payload[0].name}`}</p>
          <p className="label inline-flex">
            <span className={`w-7 h-3 border border-white mr-2`}
              style={{backgroundColor:payload[0].payload.fill}}>
              </span>
              <span className="text-white">Total ${formatToCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cardShodow">
        <p className={`text-center p-3 text-[14px] font-[500] ${name==="INCOME"? 'text-[#2a9ca6]' : 'text-[maroon]'}`}>{titleChart}</p>
        <PieChart 
          width={dimens.wdt} 
          height={dimens.hgt}
          data={data}  className="">
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx={dimens.cx}
            cy={dimens.cy}
            outerRadius={dimens.or}
            innerRadius={dimens.ir}
            offsetRadius={20}
            fill="#8884d8"
            //label={renderCustomizedLabel}
            //label
          />
           <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            align="left"
            width={dimens.leg.wdt} 
            wrapperStyle={{ 
                paddingLeft: dimens.leg.pl,
                paddingTop:dimens.leg.pt,
                paddingBottom:dimens.leg.pb,
                fontSize:dimens.leg.ft,
                
                top: dimens.leg.t, 
                right: dimens.leg.r, 
                //backgroundColor: '#ccc', 
                //border: '1px solid #d5d5d5', 
                
                //borderRadius: 3, 
                verticalAlign:"left",
                //layout:"horizontal",
                lineHeight: '25px',
              }}
            itemStyle={{
                //whiteSpace: 'nowrap',
                //textOverflow: 'ellipsis'
              }} 
                
            //payload={data}
            //payload={data.map((dt)=>{return { value: getValue(dt), type: 'rect',  color: dt.fill }})}
            payload={data.map((dt) => {
              return {
                value: getValue(dt),
                type: 'rect',
                color: dt.fill,
              };
            })}
            formatter={(value, entry) => (
              <span style={{ color: '#444' }}>{value}</span> // Set legend text color
            )}
            />
        </PieChart>
        <p className={`text-[13px] text-center ${dimens.bTextStyle} font-[500] ${name==="INCOME"? 'text-[#1cac88]' : name==="RECEIVABLES" || name==="PAYABLES"? 'text-blue-800' : 'text-[#f26c6c]'}`}>{titleTotal} {titleAmount}</p>
    </div>
  );
}
