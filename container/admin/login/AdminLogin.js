'use client'
import React, { useEffect, useState } from 'react'
import { handleCreateUser } from '@/container/admin/utils/handleCreateUser';
import TextInputPasscode from '@/container/admin/components/reusableComponents/TextInputPasscode';
import TextInputPassword from '@/container/admin/components/reusableComponents/TextInputPassword';



const AdminLogin = ({clientsData, handleRevalidate, setAdmin}) => {
    const [form, setForm] = useState({userName:'', passcode:'', passcodeSlug:''})
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    let clientsFmt = [];
    clientsFmt = [{value:'', title: '--- Select Client ---', name:'SELECT',  }, ...clientsFmt];

    //console.log(form);

   const handleOnChange =(e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]:value})
   }
  
   const handleSubmit = async (e)=>{
    e.preventDefault();
    setAdmin(true)
   }


  return (
    <div className='p-4 fixed top-0 bottom-0 h-screen overflow-hidden flex justify-center items-center z-50 w-full bg-[#2a2a36]/95'>
        <div className='flex flex-col w-full max-w-[480px] '>
                 
                    <form onSubmit={handleSubmit}
                     className={''}>
            
                        <TextInputPassword
                            //style={el.style}
                            //contStyle
                            title={'User Name'}
                            name={'userName'}
                            value={form.userName}
                            type="text"
                            onChange={handleOnChange}
                            placeholder={'Username'}
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
               
                
        </div>
    </div>
  )
}

export default AdminLogin;