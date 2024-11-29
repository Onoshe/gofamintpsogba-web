'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import TextInput from '@/container/admin/components/reusableComponents/TextInput';
import RadioBtn from '@/container/admin/components/reusableComponents/RadioBtn';
import ToastAlert from '@/components/toast/ToastAlert';
import { handleCreateClient } from '@/container/admin/utils/handleCreateClient';
import TextInputPasscode from '@/container/admin/components/reusableComponents/TextInputPasscode';
import Checkbox, { CheckboxSingle } from '@/container/admin/components/reusableComponents/Checkbox';

const CreateClient = ({clientsData, handleRevalidate}) => {
    const [form, setForm] = useState({autoCreateTables:true})
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    let clientsFmt = [...clientsData].map((tb)=> { return {...tb, value:tb.companyDomain, title:`${tb.id} ${tb.companyName}- (${tb.companyDomain}) [${parseInt(tb.inactive)? 'INACTIVE' :'ACTIVE'}]`, name:tb.companyDomain}})
    clientsFmt = [{value:'', title: '--- Select Client ---', name:'SELECT',  }, ...clientsFmt];

   // console.log(form);

   const handleOnChange =(e)=>{
        const {name, value} = e.target;
        //console.log(name, value)
        if(name==="RADIOACT"){
            setForm({...form, packagePlan:value});
        }else if(name==="TITLE"){
            setForm({...form, contactPersonTitle:value});
        }else if(name==="autoCreateTables"){
            setForm({...form, autoCreateTables:!form.autoCreateTables});
        }else{
            setForm({...form, [name]:value})
        }
   }


  
   const handleSubmit = async (e)=>{
        e.preventDefault();
       //return console.log(form);
       await handleCreateClient(form, alert, setAlert, handleRevalidate, setForm);
       //setAlert({...alert, msg:'', msgTitle:"Client with domain name '"+resData.body.domain+"' and tables created successfully", type:'success', show:true});
   }


 const textInputs = [
    {name:'companyName', title:'Company Name', placeholder:'Enter company name', required:'required', style:''},
    {name:'companyDomain', title:'Company Domain', placeholder:'demo as in demo@firstname.lastname', required:'required', style:''},
    {name:'email', title:'Company Email', placeholder:'Enter company email', required:'required', style:''},
    {name:'address', title:'Company Address', placeholder:'Company address', required:'required', style:''},
    {name:'contactPersonFirstName', title:'Contact Person Firstname', placeholder:'Contact person firstname', required:'required', style:''},
    {name:'contactPersonLastName', title:'Contact Person Lastname', placeholder:'Contact person lastname', required:'required', style:''},
    //{name:'contactPersonTitle', title:'Contact Person Title', placeholder:'Contact person title', required:'required', style:''},
    {name:'contactPersonPhoneNo', title:'Contact personal phone no', placeholder:'Contact personal phone no', required:'required', style:''},
    {name:'businessType', title:'Business Type', placeholder:'Enter business type', required:'', style:''},
    {name:'description', title:'Description', placeholder:'Enter description', required:'', style:''},
 ];

  return (
    <div className='p-4 w-full'>
        <div className='flex flex-col w-full'>
                <BackgroundCard
                    title={"Create New Client"}
                    style={'flex flex-col gap-3 mr-5 h-fit mb-5'}
                >
                    <div className='pb-3'>
                        <p className='text-blue-700'>New Client details will be inserted on _clients Table.</p>
                        <p className='text-blue-700'>Database for new client is however not created. Database can only be created manually in CPANEL</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    {textInputs?.map((el, i)=>{
                        return(
                            <TextInput key={`${i}key`}
                                style={el.style}
                                title={el.title}
                                name={el.name}
                                value={form[el.name]}
                                type="text"
                                onChange={handleOnChange}
                                placeholder={el.placeholder}
                                required={el.required}
                            />
                        )
                    })}
                     <div className='flex flex-col gap-2 pb-3 flex-wrap border border-gray-500 rounded-md mt-3 mb-5'>
                        <p className='px-3 pt-4 -mb-2'>Contact Person Title</p>
                        <div className='flex flex-row w-full'>
                            <RadioBtn title="Mr"
                                name="contactPersonTitle"
                                value="Mr"
                                checked={form.contactPersonTitle === "Mr"}
                                onChange={handleOnChange}
                            />
                            <RadioBtn title="Mrs"
                                name="contactPersonTitle"
                                value="Mrs"
                                checked={form.contactPersonTitle === "Mrs"}
                                onChange={handleOnChange}
                            />
                            <RadioBtn title="Miss"
                                name="contactPersonTitle"
                                value="Miss"
                                checked={form.contactPersonTitle === "Miss"}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 pb-3 flex-wrap border border-gray-500 rounded-md mt-3 mb-5'>
                        <p className='px-3 pt-4 -mb-2'>Plan Package</p>
                        <div className='flex flex-row w-full'>
                            <RadioBtn title="Basic"
                                name="RADIOACT"
                                value="Basic"
                                checked={form.packagePlan === "Basic"}
                                onChange={handleOnChange}
                            />
                            <RadioBtn title="Pro"
                                name="RADIOACT"
                                value="Pro"
                                checked={form.packagePlan === "Pro"}
                                onChange={handleOnChange}
                            />
                             <RadioBtn title="Premium"
                                name="RADIOACT"
                                value="Premium"
                                checked={form.packagePlan === "Premium"}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                        <CheckboxSingle
                            title="Create Database Tables"
                            form={form}
                            name="autoCreateTables"
                            label = "Auto Create Client database Tables"
                            onChangeHandler={handleOnChange}
                            titleSub="Client account will be created together with all the reuired tables.Table - 'coastructure' will also be populated."
                            contStyle={'hidden'}
                            //disable={disableTables}
                        />
                         <TextInputPasscode
                            onChange={handleOnChange}
                            title="Passcode"
                            name1="passcodeSlug"
                            name2="passcode"
                            value1={form?.passcodeSlug}
                            value2={form?.passcode}
                            placeholder1="Passcode slug"
                            placeholder2="Passcode"
                            required
                        />

                        <input value="Enter" type='submit' className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                            border-gray-400 rounded-md'/>
                    </form>
                </BackgroundCard>
                <ToastAlert
                    alert={alert}
                    setAlert={setAlert}
                />
        </div>
    </div>
  )
}

export default CreateClient;