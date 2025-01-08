'use client'
import React, {useState, useEffect} from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";




const IndexHeaderTabs = ({headersArr,headerTab, setSelectedTab, handleSelReport,currentReport,  companyId, selTab, setSelTab, reportName, domainNm, user, tabsDropdownObj}) => {
    //const tabsDropdownObj = tabsDropdown;

    const selectedTabHandler =(tab, idx)=>{
        setSelectedTab(tab);
        setSelTab({open:true, idx});
    }
    //console.log(tabsDropdownObj)

  return (
    <div className={`flex flex-row bg-[#373c46] relative`}>
        <div className={`flex flex-row gap-2 overflow-x-auto smc:overflow-x-hidden  w-full`}>
            {
                headersArr?.map((tab, i)=>{
                    const tabItem = headerTab[tab];
                    let isReport = selTab?.idx === i;
                    if(currentReport?.reportGroup){
                        isReport = currentReport.reportGroup.toLowerCase() === tab.toLowerCase();
                    }
                    //console.log(i===selTab.idx && selTab.open+" Hello");
                    return(
                        <div key={`${i}+key`}
                         className={`cursor-pointer py-[5px] smc:py-0 smc:pt-1 text-[18px] flex-1 items-center justify-center flex flex-col ${isReport? 'text-[blue] bg-white border-x-blue-600 border-[3px] border-b-white' : 'text-[#97aec3] '}  whitespace-nowrap group`}
                         onClick={()=>selectedTabHandler(tabItem, i)}>
                            <div className="flex py-[2px] text-[22px] gap-2 flex-row justify-center items-center">
                                {tabItem.icon}
                                <span className='text-[12px] sm:text-base hidden smc:block'>{tabItem.tabName}</span>
                            </div>
                            <Dropdown tabItem={tabItem} 
                                companyId={ companyId}
                                handleSelReport={handleSelReport}
                                index={i}
                                tabsLen={headersArr.length}
                                setSelTab={setSelTab}
                                domainNm={domainNm}
                                tabsDropdownObj={tabsDropdownObj}
                            />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}


//right-0 sm:right-auto w-[100%] sm:w-auto

const Dropdown =({tabItem, handleSelReport, index, tabsLen, domainNm, tabsDropdownObj})=>{
    const showCustomersLoan = domainNm?.toLowerCase() === "kosofe"; 

    let tabsDropdowns = tabsDropdownObj;
    if(!showCustomersLoan){
      const customersArr = [...tabsDropdownObj.customers];
      const customers = customersArr.filter((dt)=> dt.name !== "customers-loan");
      tabsDropdowns.customers = customers;
    }
    //console.log(showCustomersLoan, tabsDropdowns)
    return(
        <div className={`absolute  z-50 top-[40px] min-w-[150px] flex-col items-center hidden  hover:flex group-hover:flex ${index==0? 'left-0 smc:left-auto' : index== tabsLen-1? 'right-0 smc:right-auto' : ''}`}
            >
            <BiCaretUp className="absolute -top-[14px] text-blue-600 text-[22px]"/>
            <div className="text-[12px] md:text-base border border-blue-600 rounded-md bg-blue-50 shadow-lg w-fit">
                <p className="bg-blue-400 text-center text-white py-[4px] font-bold">{tabItem.tabName}</p>
                <div className="flex flex-col p-3 text-[12px] md:text-[13px]">
                    {tabsDropdowns[tabItem.tabName.toLowerCase()].map((dt, i)=>{
                        return(
                            <div key={`${i}key`}
                                className={`text-gray-600 pt-1 hover:text-blue-600 cursor-pointer active:text-blue-400`}
                             onClick={()=>handleSelReport(dt)}>
                                {dt.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default IndexHeaderTabs