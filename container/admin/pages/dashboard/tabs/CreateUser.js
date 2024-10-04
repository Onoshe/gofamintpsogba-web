'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import TextInput from '@/container/admin/components/reusableComponents/TextInput';
import ToastAlert from '@/components/toast/ToastAlert';
import { handleCreateUser } from '@/container/admin/utils/handleCreateUser';
import TextInputPasscode from '@/container/admin/components/reusableComponents/TextInputPasscode';
import Selections from '@/container/admin/components/reusableComponents/Selections';
import TextInputPassword from '@/container/admin/components/reusableComponents/TextInputPassword';



const CreateUser = ({clientsData, handleRevalidate}) => {
    const [form, setForm] = useState({})
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    let clientsFmt = [...clientsData].map((tb)=> { return {...tb, value:tb.companyDomain, title:`${tb.id} ${tb.companyName}- (${tb.companyDomain}) [${parseInt(tb.inactive)? 'INACTIVE' :'ACTIVE'}]`, name:tb.companyDomain}})
    clientsFmt = [{value:'', title: '--- Select Client ---', name:'SELECT',  }, ...clientsFmt];

    let selectionRoles = [{value:'', title: '--- Select Role ---', name:'SELECT', }, {value:'admin', title: 'Admin', name:'admin'}, {value:'accountant', title: 'Accountant', name:'accountant'}, {value:'viewer', title: 'Viewer', name:'viewer'}];
    let selectionStatus = [{value:'', title: '--- Select Status ---', name:'SELECT', }, {value:1, title: 'Active', name:1}, {value:0, title: 'No-active', name:0}];

    //console.log(form);

   const handleOnChange =(e)=>{
        const {name, value} = e.target;
        //console.log(name, value)
        if(name==="RADIOACT"){
            setForm({...form, packagePlan:value});
        }else if(name==="GENDER"){
            setForm({...form, contactPersonGender:value});
        }else{
            setForm({...form, [name]:value})
        }
   }


  
   const handleSubmit = async (e)=>{
    e.preventDefault();
    handleCreateUser(form, alert, setAlert, handleRevalidate, clientsData);
   }


 const textInputs = [
    {name:'firstname', title:'Firstname', placeholder:'User firstname', required:'required', style:''},
    {name:'lastname', title:'Lastname', placeholder:'User lastname', required:'required', style:''},
    {name:'email', title:'Email', placeholder:'User email', required:'required', style:''}
 ];

  return (
    <div className='p-4 w-full'>
        <div className='flex flex-col w-full'>
                <BackgroundCard
                    title={'Create New User'}
                    style={'flex flex-col gap-3 mr-5 h-fit mb-5'}
                >
                    
                    <form onSubmit={handleSubmit}>
                    <Selections
                        title="Select Client"
                        name="domain"
                        data={clientsFmt}
                        onChange={handleOnChange}
                        required
                        //disable={disableClients}
                        domain={form?.domain}
                    />  
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
                         <Selections
                            title="Role"
                            name="role"
                            data={selectionRoles}
                            onChange={handleOnChange}
                            //disable={disableClients}
                            hideDomain
                            domain={form?.role}
                            required
                        />  
                        <Selections
                            title="Status"
                            name="inactive"
                            data={selectionStatus}
                            onChange={handleOnChange}
                            //disable={disableClients}
                            hideDomain
                            domain={form?.inactive}
                            required
                        />  
                        <TextInputPassword
                            //style={el.style}
                            //contStyle
                            title={'User Password'}
                            name={'password'}
                            value={form.password}
                            type="text"
                            onChange={handleOnChange}
                            placeholder={'Password'}
                            required
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

export default CreateUser;