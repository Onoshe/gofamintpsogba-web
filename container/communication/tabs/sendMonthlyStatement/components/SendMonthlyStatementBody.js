import TextInput from "@/container/company/components/reusableComponents/TextInput";


export const SendMonthlyStatementBody = ({apibody, handleOnChange, handlePost, handleTargetDate,
    error, setPostAccess, postAccess,checked,handlePostAccess, sendingMail, mailSentTo,handleResetList
}) => {


    
  return (
    <>
        <p className='text-center text-blue-900 p-4 font-bold underline'>Send Monthly Statement</p>
        <div className='flex justify-center items-center flex-col md:flex-row'>
            <div className='shadow-lg p-4 flex flex-col m-4 w-fit bg-[#fdefeb] max-w-lg'>
                <p className='text-center font-bold'>API body</p>
                <p>{"{"}</p>
                    <p className='pl-3'>{`"coySlug":"KOSOFE-COOPERATIVE",`}</p>
                    <p  className='pl-3'>{`"accountType":`} {'"'+apibody.accountType+'"'}</p>
                    <p  className='pl-3'>{`"targetDate":`} {'"'+apibody.targetDate+'"'}</p>
                    <p  className='pl-3'>{`"email":`} {'"'+apibody.email+'"'}</p>
                    <p  className='pl-3'>{`"sendTo":`} {'"'+apibody.sendTo+'"'}</p>
                    <p  className='pl-3'>{`"Bcc":`} {'"'+apibody.bcc+'"'}</p>
                <p>{"}"}</p>
                <p className='text-sm'><span className='text-blue-900 font-bold'>sendTo:</span> Either MEMEBERS or PROVIDED-EMAIL. If set as MEMBERS, report will be sent to individual respective email else, all reports will be forwarded to the provided Email (default- ozitechstudio@gmail.com)</p>
                <p className='text-sm'><span className='text-blue-900 font-bold'>email:</span> All reports will be sent to this email if sendTo is set at PROVIDED-EMAIL.</p>

                {mailSentTo?.length? <>
                    <p className="text-red-900 mt-3 text-sm font-bold">Mail Sent To: {mailSentTo?.length}</p> 
                    <div className="bg-white border border-blue-400 py-2 px-4 max-h-[100px] overflow-auto">
                        {
                            mailSentTo?.map((dt, i)=>{
                                return(
                                    <p key={`${i}key`} className="text-[12px]">{dt}</p>
                                )
                            })
                        }
                    </div>
                    <button className="btn btn-sm btn-info w-fit mt-2 px-4" onClick={handleResetList}>Clear</button>
                </>: <></>}
            </div>
            <div className='shadow-lg p-4 gap-2 flex flex-col m-4 w-[40vw] min-w-[300px] max-w-[450px] bg-[#fdefeb]'>
                <TextInput
                    title="AccountType"
                    placeholder="SAVINGS or LOANS"
                    value={apibody.accountType}
                    onChange={handleOnChange} 
                    required
                    name="accountType"
                    autoComplete 
                    inputStyle={'inline-block'}
                />
                <TextInput
                    title="Email"
                    placeholder="Default: ozitechstudio@gmail.com"
                    value={apibody.email}
                    onChange={handleOnChange} 
                    required
                    name="email"
                    autoComplete 
                />
                <TextInput
                    title="SendTo"
                    placeholder="PROVIDED-EMAIL or MEMBERS"
                    value={apibody.sendTo}
                    onChange={handleOnChange} 
                    required
                    name="sendTo"
                    autoComplete 
                />
                <TextInput
                    title="Blank Copy"
                    placeholder="Email: bcc"
                    value={apibody.bcc}
                    onChange={handleOnChange} 
                    required
                    name="bcc"
                    autoComplete 
                />
                <div>
                    <p className='text-teal-700 font-bold'>Target Date <span className='text-red-600 font-bold'>*</span></p>
                    <div className='flex gap-2 items-center'>
                        <div className='flex flex-col gap-2 '>
                            <div className='flex gap-2 items-center'>
                                <input type='checkbox' className='w-4 h-4 cursor-pointer hidden'
                                    checked={checked==="DATE"}
                                    onChange={()=>handleTargetDate('DATE')}/>
                                <p>Date</p>
                            </div>
                            <div className='gap-2 items-center hidden'>
                                <input type='checkbox' className='w-4 h-4 cursor-pointer'
                                    checked={checked==="LASTMONTH"}
                                    onChange={()=>handleTargetDate('LASTMONTH')}/>
                                <p>Last Month</p>
                            </div>
                        </div>
                        {checked === 'DATE'?
                            <input type='date'
                                className='p-1 border border-gray-300'
                                value={apibody.targetDate} 
                                onChange={handleOnChange}
                                required
                                name="targetDate"
                            />
                           : <input type='text'
                                className='p-1 border border-gray-300 w-[150px]'
                                placeholder="LASTMONTHEND"
                                value={apibody.targetDate} 
                                readOnly
                                name="targetDate"
                            />
                        }
                    </div>
                    
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className={`text-center p-3 text-sm ${sendingMail? 'text-teal-700' : 'text-red-500'}`}>{error}</p>
           <div className='flex flex-row flex-wrap gap-3'>
            <input className='border border-gray-400 w-28 px-2 py-1 bg-red-50'
                    placeholder='Post access' 
                    value={postAccess} 
                    onChange={handlePostAccess}/>
                <button className={`bg-blue-800 btn btn-accent text-white py-2 px-12 rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-50`}
                    disabled={sendingMail? 'disabled' : ''}
                    onClick={handlePost}>Post
                </button>
           </div>
        </div>
    </>
  )
}


export default SendMonthlyStatementBody;

