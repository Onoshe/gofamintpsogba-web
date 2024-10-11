'use client'
import React from 'react';
import {InputComponent, RadioInputComponent, SelectionTag, SelectionTagNew, TextAreaInputComponent} from "@/components/forms/InputComponents"
import Hideable from '../collapsible/Hideable';
import { BiError } from 'react-icons/bi';


const Form = ({ onChangeHandler, basicTextFields, keysCompany, keysContactPerson, formData, groupValue,options,
        handleSubmit, infoMsg, personalAcctType, handleCancel, selectedOption, setSelectedOption, 
        handleSelectedGroup, noGroupValueMsg}) => {
    const requiredFields = ['title', 'firstname', 'lastname', 'accountCode' ];
    

  return (
        <form className='max-w-[1200px] bg-slate-50 text-gray-500 py-3 pb-24'
            onSubmit={handleSubmit}>
                <RadioInputComponent               
                    opt1={basicTextFields.type.opt1}
                    opt2={basicTextFields.type.opt2}
                    name={'type'}
                    title={basicTextFields.type.title}
                    onChange={onChangeHandler}
                    value={formData.type}
                    subTitle=""
                    contStyle={'mb-4 px-3'}
                    required
                />
                <SelectionTagNew               
                    opt1={basicTextFields.type.opt1}
                    opt2={basicTextFields.type.opt2}
                    name={'accountGroup'}
                    title={basicTextFields.type.title}
                    onChange={onChangeHandler}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    handleSelected={handleSelectedGroup}
                    value={formData?.accountGroup}
                    groupValue={groupValue}
                    subTitle=""
                    contStyle={'mb-4 pl-3'}
                    options={options}
                    noGroupValueMsg={noGroupValueMsg}
                    required
                />
                {/*<SelectionTag
                    optArr={[basicTextFields.type.opt1, basicTextFields.type.opt2]}
                    type={basicTextFields.type.type}
                    name={'accountGroup'}
                    title={basicTextFields.type.title}
                    onChange={onChangeHandler}
                    contStyle={'mb-4'}
                    value={formData?.accountGroup}
                    required="required"
                    //value
                    //required, 
                    //isRequired
                />*/}
                <p className='font-bold text-blue-400 mb-3 px-3'>Contact Person details</p>
                <div  className='grid grid-cols-1 xl:grid-cols-2 px-3'>
                    {
                        keysContactPerson.map((item, i)=>{
                            const isRadio = basicTextFields[item].type === 'radio';
                            const isOpts = basicTextFields[item].type === 'opts';
                            return(
                                <div  key={`${i}key`} className=''>
                                    {isRadio? 
                                        <RadioInputComponent               
                                            opt1={basicTextFields[item].opt1}
                                            opt2={basicTextFields[item].opt2}
                                            name={item}
                                            title={basicTextFields[item].title}
                                            onChange={onChangeHandler}
                                            value={formData[item]}
                                            subTitle=""
                                            contStyle={'mb-4'}
                                        />
                                        :isOpts?
                                        <SelectionTag
                                            optArr={basicTextFields[item].optArr}
                                            type={basicTextFields[item].type}
                                            name={item}
                                            title={basicTextFields[item].title}
                                            onChange={onChangeHandler}
                                            contStyle={'mb-4'}
                                            value={formData[item]}
                                            required="required"
                                            //value
                                            //required, 
                                            //isRequired
                                        />
                                        :<InputComponent               
                                            title={basicTextFields[item].title}
                                            type={basicTextFields[item].type}
                                            name={item}
                                            value={formData[item]}
                                            onChange={onChangeHandler}
                                            pholder={item==="accountCode" && personalAcctType ==="CUSTOMERS"? "Numbers; 001 -> C-001" : item==="accountCode"&& personalAcctType ==="vendors"? "V-" : basicTextFields[item].title}
                                            contStyle={`mb-4`}
                                            titleStyle={''}
                                            inputStyle={'py-3 text-sm'}
                                            required={requiredFields.includes(item)}
                                        />
                                    }
                               </div>
                            )
                        })
                    }
                </div>
                
                
                <Hideable header="Add Company details" headerClassName='font-bold text-blue-400 mt-5 mb-5 px-3'>
                    <div  className='grid grid-cols-1  xl:grid-cols-2'>
                      {
                        keysCompany.map((item, i)=>{

                            const isRadio = basicTextFields[item]?.type === 'radio';
                            const isOpts = basicTextFields[item]?.type === 'opts';
                            return(
                                <div  key={`${i}key`} className=''>
                                    {isRadio? 
                                        <RadioInputComponent               
                                            opt1={basicTextFields[item].opt1}
                                            opt2={basicTextFields[item].opt2}
                                            name={item}
                                            title={basicTextFields[item].title}
                                            onChange={onChangeHandler}
                                            value={formData[item]}
                                            subTitle=""
                                            contStyle={'mb-4'}
                                        />
                                        :isOpts?
                                        <SelectionTag
                                            optArr={basicTextFields[item].optArr}
                                            type={basicTextFields[item].type}
                                            name={item}
                                            title={basicTextFields[item].title}
                                            onChange={onChangeHandler}
                                            contStyle={'mb-4'}
                                            value={formData[item]}
                                            //required, 
                                            //isRequired
                                        />
                                        :<InputComponent               
                                            title={basicTextFields[item].title}
                                            type={basicTextFields[item].type}
                                            name={item}
                                            value={formData[item]}
                                            onChange={onChangeHandler}
                                            pholder={basicTextFields[item].title}
                                            contStyle={`mb-4`}
                                            titleStyle={''}
                                            inputStyle={'py-2'}
                                            
                                        />
                                    }
                               </div>
                            )
                                })
                            }
                        </div>
                        <TextAreaInputComponent               
                            title="Additional Info"
                            name="info"
                            value={formData?.info}
                            onChange={onChangeHandler}
                            pholder={"Additinal info"}
                            contStyle={`mb-2`}
                            titleStyle={''}
                            inputStyle={'py-1'}
                        />
                </Hideable>  

                
                <input className="hidden btn my-5 btn-accent px-7 text-white" type='submit' value="Submit"/>
                <div className=' px-5 py-3 fixed bottom-0 bg-gray-200 w-full flex flex-row gap-10'>
                    <input className="btn btn-accent px-7 text-white" type='submit' value="Submit"/>
                    {infoMsg?.error && <div className='text-red-700 pt-3 hidden text-sm flex-row gap-2 flex-wrap'><BiError size={24}/> {infoMsg?.msg}</div>}
                    <p className='btn btn-neutral px-8' onClick={handleCancel}>Cancel</p>
                </div>       
        </form> 
  )
}

export default Form