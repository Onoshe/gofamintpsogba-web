'use client'
import { Checkbox,  Selection, TextArea, TextInput } from '@/components/forms/InputComponentsDaisy';
import PageBlind from '@/navigation/pageBlind/PageBlind';
import { BiSolidError } from 'react-icons/bi';
import { MdCancel, MdClose } from 'react-icons/md';


const CreateChartOfAccount = ({handleSubmit, selectedOpt="999", showBlind, handleClose,formInput,infoMsg, handleFormInput, coaStructure}) => {
    const selectCOA = {
        class:"",
        classCode:"",
        code:"999",
        id:"",
        name:"SELECT",
        selectable:"1",
        subCode:"",
        title: "---Select---"
    };

    const coaStructureArr = [selectCOA, ...coaStructure];
    //console.log(selectedOpt)
    return (
    <PageBlind showBlind={showBlind}>
        <div className={`w-full justify-center items-center flex flex-col`}>
            <div className='w-full max-w-[600px] justify-center flex flex-col bg-white shadow-lg text-gray-900'>
                <div className='bg-[aliceblue] w-full  border-b border-gray-100 flex flex-row items-center justify-between p-2 md:p-6'>
                    <p className='font-bold text-blue-500'>Create Account</p>
                    <MdClose size={32} className='text-red-700 hover:text-[red] active:text-red-200 cursor-pointer'
                     onClick={handleClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 md:p-5 gap-4 flex flex-col'>
                        <Selection
                            labelName="Account Type*"
                            //classNameCont={'w-[calc(100% - 120px)]'}
                            classNameCont={'max-w-[350px]'}
                            classNameLabel={'whitespace-nowrap w-[120px] text-red-600 mr-2'}
                            classNameInput={'text-blue-700'}
                            name="typeCode"
                            required
                            onChange={handleFormInput}
                        >   
                            {
                                coaStructureArr?.map((dt,i)=>{
                                    const isSelectable = !["0", 0, ""].includes(dt.selectable);
                                    return(
                                        <>
                                            <option key={`${i}key`} 
                                                disabled={isSelectable? '' :'disable'}  
                                                selected={parseInt(dt.code) ===  parseInt(selectedOpt)? 'selected' : ''}
                                                className={`w-full  ${isSelectable? 'text-[blue]' : 'font-bold text-black'} `}
                                                value={dt.code}>
                                                {i===0? dt.title : dt.code+" "+dt.title}
                                            </option>  
                                            {dt.selectable?
                                                <></>
                                             :<hr/>
                                            } 
                                        </>         
                                    )
                                })
                            }
                        </Selection>
                        <TextInput
                            labelName="Account Name*"
                            classNameLabel={'whitespace-nowrap w-[120px] text-red-600 mr-2'}
                            type="text"
                            name="accountName"
                            placeholder="Maximum length of 52"
                            maxlength="52"
                            value={formInput.accountName}
                            required
                            onChange={(e)=>handleFormInput(e)}
                        />
                        <TextInput
                            labelName="Account Code*"
                            classNameLabel={'whitespace-nowrap w-[120px] text-red-600 mr-2'}
                            type="text"
                            name="accountCode"
                            placeholder="Digits- maximum length of 15"
                            maxlength="15"
                            value={formInput.accountCode}
                            required
                            onChange={(e)=>handleFormInput(e)}
                        />
                        <TextArea
                            labelName="Description"
                            classNameLabel={'whitespace-nowrap w-[120px] mr-2'}
                            type="text"
                            name="description"
                            placeholder="Maximum of 500 characters"
                            maxlength="500"
                            value={formInput.description}
                            onChange={(e)=>handleFormInput(e)}
                        />
                        <Checkbox 
                            classNameCont={'smc:ml-[124px] hidden'}
                            labelName="Add to the watchlist on my dashboard"
                            name="addToDashboard"
                            checked={formInput.addToDashboard}
                            onChange={()=>handleFormInput({target:{name:"addToDashboard", value:!formInput.addToDashboard}})}
                            />
                        <div className="text-[12px] -mt-3 -mb-5">
                            <p class="font-[500]">Valid Account Code:</p>
                            <p>* Any of 0 - 9, A - Z, a - z, and hyphen and no space</p>
                            <p>* Can only begin with any of the digits from 1 - 9</p>
                            <p>* Minimum length of 5 and maximum length of 15 </p>
                        </div>
                    </div>
                    
                    <div 
                        className={`flex flex-row gap-2 smc:ml-[150px] ${infoMsg?.error? 'text-red-600' :'text-green-800'}`} >
                       {infoMsg?.error && <BiSolidError size={23} />} <p>{infoMsg?.msg}</p>
                    </div>
                    <div className='flex flex-row gap-4 p-4 md:p-6'>
                        <input type='submit' className="btn btn-info px-10" value="Save"/>
                        <button className="btn bg-gray-300 text-black hover:bg-gray-400" onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </PageBlind>
  )
}

export default CreateChartOfAccount;