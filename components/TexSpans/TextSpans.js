import CheckboxCustomise from "@/assets/svg/CheckboxCustomise";


function SpanHLight({text, col, bCol, bold, border, cursor, underline, lineStyle}){

    return(
      <span className='p-1'
        style={{backgroundColor:bCol? bCol : "white", color:col? col : 'maroon',
          fontWeight:bold? 'bold' : 'normal', border: border? '2px solid skyblue' : '',
          marginLeft:border? '2px': '', marginRight:border? '2px': '',
          cursor: cursor? 'pointer' : '',
          textDecorationLine: underline? 'underline' : 'none', ...lineStyle}}>
        {text}
      </span>
    )
  };
  
  function SpanBtn({text, icon}){
  
    const radio = <div className='w-4 h-4 bg-white rounded-full border-2 border-solid 
                    border-blue-300 flex justify-center items-center mr-1'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                  </div>;
    const btn =  <div className='w-5 h-4  border-2 border-solid 
                  border-blue-300 bg-[aliceblue] mr-1'/>
                    
    const checkbox =  <div className='flex justify-center w-5 h-4 flex-1'>
                          <CheckboxCustomise 
                                  checked={true}
                                  size={13}
                                />
                        </div>;
    
    const iconType = {radio, btn, checkbox};
  
    return(
      <div className='text-[maroon] bg-white border-[2px] border-solid 
          border-slate-200 rounded-md px-1 w-fit items-center inline-block'>
        <div className='flex flex-row items-center'>
          {iconType[icon]}
          {text}
          </div>
      </div>
    )
  }


function InTextCompos(text){
    return(
        <div>
            {text}
        </div>
    );
}
  export {SpanBtn, SpanHLight, InTextCompos}