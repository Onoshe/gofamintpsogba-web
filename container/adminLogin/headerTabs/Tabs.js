import React from 'react';
import {HiOutlineMail, HiOutlineMailOpen} from 'react-icons/hi';


const Tabs = ({setSelectedTab, closeCollapse, unreadInbox, isNonMember}) => {
    const [seltdIndex, setSltdIndex] = React.useState(0);
    const tabsMembers = [
        {name:'userguide', title: 'User Guide'},
        {name:'birthday', title: 'Birthday Celebrants'}, 
        {name:'weddingann', title: 'WeddingAnn Celebrants'},
        {name:'myInbox', title: ' My Inbox  '},
        {name:'contactAdmin', title: 'Contact Admin'},
    ];
    const tabsNonMembers = [
        {name:'myInbox', title: ' My Inbox  '},
        {name:'contactAdmin', title: 'Contact Admin'},
    ];
    const tabs = isNonMember? tabsNonMembers : tabsMembers;

    function handleClick(el){
        const {index, tab} = el;
        setSltdIndex(index); 
        setSelectedTab(tab);
        closeCollapse();
    };
    return (
    <div className='border-2 mx-1 overflow-x-auto bg-slate-100 border-solid border-gray-500 flex flex-row'>
        {
            tabs.map((item, i)=>{

                return ( 
                <div key={`${i}+tab`} 
                    className={`${ seltdIndex === i? 'bg-[#06e8b3] text-[mediumblue]': 'bg-[#555] text-white'} 
                        cursor-pointer py-1 m-1 text-[14px] px-2 border border-blue-600 border-solid sm:text-base
                         relative whitespace-nowrap justify-center flex
                         ${item.name==='myInbox'? 'pr-5' : ''}   ${isNonMember? 'w-full' : 'w-fit'}`}
                    onClick={()=>handleClick({index:i, tab:item})}>
                        {item.title}
                    <div className={`${item.name==='myInbox'? '' : 'hidden'}`}>
                        {unreadInbox >0?
                            <HiOutlineMail size={22} color="red" className='absolute inline-block -right-1 -top-3 bg-white'/>
                            :<HiOutlineMailOpen size={22} color="gray" className='absolute inline-block -right-1 -top-2 bg-white'/>
                        }
                    </div>
                </div>)
            })
        }
    </div>
  )
}
 