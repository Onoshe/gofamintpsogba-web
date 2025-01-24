import React from 'react'

const Tabs = ({contStyle,uploadTabs, seltdTab, setSeltdTab}) => {
    

    return (
    <div className={`bg-sky-100 w-full ${contStyle}`}>
        <div className='flex flex-row overflow-y-auto'>
            {
                uploadTabs?.map((item, i)=>{

                    return(
                        <Tab key={`${i}+key`}
                            i={i}
                            seltdTab={seltdTab}
                            setSeltdTab={setSeltdTab}
                            uploadTabs={item}
                        />
                    );
                })
            }
        </div>
    </div>
  )
}

export default Tabs;



const Tab = ({i, seltdTab, setSeltdTab, uploadTabs}) => {
    return (
      <div className={`highlight flex-1 border-t-[3px] border-r-[3px] border-gray-100
        flex justify-center p-1 text-gray-600 cursor-pointer hover:bg-sky-300 hover:text-white active:bg-transparent
        ${i === seltdTab? 'border-[#999] border-l-[3px] bg-[#57a6db] text-[blue]' : 'border-b-[3px] border-b-gray-400'}`}
        onClick={()=>setSeltdTab(i)}>
          {uploadTabs}
      </div>
    )
  }
  



