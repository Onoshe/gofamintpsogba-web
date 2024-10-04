'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import TextInput from '@/container/admin/components/reusableComponents/TextInput';
import ToastAlert from '@/components/toast/ToastAlert';
import { handleCreateClient } from '@/container/admin/utils/handleCreateClient';
import DashboardCard from '@/container/admin/components/reusableComponents/DashboardCard';
import RadioBtn from '@/container/admin/components/reusableComponents/RadioBtn';
import ModalAlert from '@/components/modal/ModalAlert';
import Selections from '@/container/admin/components/reusableComponents/Selections';
import { handleAccess } from '@/container/admin/utils/handleAccess';
import TextInputPasscode from '@/container/admin/components/reusableComponents/TextInputPasscode';



const Access = ({clientsData, access, handleRevalidate}) => {
    const [form, setForm] = useState({actType:'CREATE'})
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    let accessFmt = [...access?.data?.data].map((tb)=> { return {...tb, value:tb.slug, title:`${tb.id}. ${tb.name}: ${tb.updatedAt}`, name:tb.name}})
    accessFmt = [{value:'', title: '--- Select Access ---', name:'SELECT',  }, ...accessFmt];

   // console.log(form);

   const handleOnChange =(e)=>{
        const {name, value} = e.target;
       // console.log(name, value)
        if(name==="ACCESS"){
            setForm({...form, actType:value});
        }else{
            setForm({...form, [name]:value})
        }
   }

   const handleSubmit = async (e)=>{
    e.preventDefault();
    handleAccess(form, alert, setAlert, setForm, handleRevalidate);
   }

   const setAccessCode = [
    {name:'name', title:'Name', placeholder:'Enter name', required:'required', style:''},
    {name:'slug', title:'Slug', placeholder:'Unique slug', required:'required', style:''},
    {name:'description', title:'Description', placeholder:'Enter description', required:'required', style:''},
    {name:'column1', title:'Column1', placeholder:'Column1', required:'required', style:''},
    {name:'column2', title:'Column2', placeholder:'Column2', required:'', style:''},
 ];

 const updateAccessCode = [
    {name:'newAccess', title:'New Access', placeholder:'New Access', required:'required', style:''},
    {name:'confirmAccess', title:'Confirm Access', placeholder:'Confirm access', required:'required', style:''},
 ];

 
  return (
    <div className='p-4 w-full'>
        <div className='flex flex-col w-full'>
                <BackgroundCard
                    title={'Access Manager'}
                    style={'flex flex-col gap-3 mr-5 h-fit mb-5'}
                >   
                     
                     <div className={`flex gap-2 flex-wrap mb-4`}>
                            <RadioBtn title="CREATE"
                                name="ACCESS"
                                value="CREATE"
                                checked={form.actType === "CREATE"}
                                onChange={handleOnChange}
                            />
                            <RadioBtn title="UPDATE"
                                name="ACCESS"
                                value="UPDATE"
                                checked={form.actType === "UPDATE"}
                                onChange={handleOnChange}
                            />
                            
                        </div>
                        {form.actType === "UPDATE" &&
                            <Selections
                            title="Select access"
                            name="slug"
                            data={accessFmt}
                            onChange={handleOnChange}
                            domain=""
                            hideDomain
                        /> } 
                    <form onSubmit={handleSubmit}>
                    {form.actType === "CREATE" && setAccessCode?.map((el, i)=>{
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
                    {form.actType === "UPDATE" && updateAccessCode?.map((el, i)=>{
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
                        <TextInputPasscode
                            onChange={handleOnChange}
                            title="Passcode"
                            name1="passcodeSlug"
                            value1={form.passcodeSlug}
                            placeholder1="Passcode slug"
                            name2="passcode"
                            value2={form.passcode}
                            placeholder2="Passcode"
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


export default Access;