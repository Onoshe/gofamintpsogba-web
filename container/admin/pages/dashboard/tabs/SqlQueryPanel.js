'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import ToastAlert from '@/components/toast/ToastAlert';
import { handleManageClient } from '@/container/admin/utils/handleManageClient';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { handleSqlQuery } from '@/container/admin/utils/handleSqlQuery';



const SQLQueryPanel = ({clientsData}) => {
    const [form, setForm] = useState({db:'', query:'', access:'', passcode:''})
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});

    //console.log(form);

    const handleOnChange =(e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }
   const handleSubmit = async (e)=>{
    e.preventDefault();
    handleSqlQuery(form, alert, setAlert, setData);
    
   }

   let rowKeys = [];
   let rows = [];
   if(data?.length){
        rowKeys = Object.keys(data[0]);
        rows = data;
   }
   

  return (
    <div className='p-4 w-full'>
        <div className='flex flex-col w-full'>
                <BackgroundCard
                    title={'SQL Query Panel'}
                    style={'flex flex-col gap-3 mr-5 h-fit mb-5'}
                >
                    <p>Write your SQL query</p>
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            value={form.query} 
                            onChange={handleOnChange} 
                            placeholder="SELECT * FROM practice_db;" 
                            rows="15" 
                            name="query"
                            required
                            autoComplete
                            autoSave
                            //cols="50"
                            className='w-full p-4 bg-white border border-gray-300 rounded-md px-3 outline-none active:outline-none hover:shadow-md'
                        />
                        <br/>
                        <div className='flex flex-row flex-wrap gap-2 mb-2'>
                            <input className='py-1 px-3 rounded-md w-[125px] outline-none' placeholder='access'
                                name="access"
                                value={form.access}
                                onChange={handleOnChange}
                                />
                             <input className='py-1 px-3 rounded-md w-[125px] outline-none' placeholder='passcode'
                                name="passcode"
                                value={form.passcode}
                                onChange={handleOnChange}
                                />
                        </div>
                        <button type="submit"
                         className='border border-gray-300 shadow-md py-2 px-4 mt-2 hover:bg-white active:bg-gray-200'
                         >Execute Query
                        </button>
                        <p className='py-3 text-[12px] text-[maroon]'></p>
                    </form>
                </BackgroundCard>
                <BackgroundCard
                    title={'Query Result'}
                    style={'flex flex-col gap-3 mr-5 h-fit max-h-[800px]'}
                >
                <div className='overflow-auto w-full'>
                    <table className="table table-sm table-zebra">
                    <thead>
                        <tr className={`text-[12px]`}>
                            <td className={'py-2'}>{rowKeys?.length? 'SN' :''}</td> 
                            {rowKeys?.map((key, i)=>{
                                return(
                                    <td key={`${i}header`} className={``} 
                                        >
                                        {key}
                                    </td>
                                )
                            })}
                        </tr>
                    </thead> 
                    <tbody>
                        {rows?.map((row, i)=>{
                            return(
                                <tr key={`${i}td`} className={''}>
                                    <td className={`py-1 text-[11px]`}>{i+1}</td>
                                    {
                                    rowKeys?.map((key, id)=>{
                                            return(
                                                <td key={`${id}key`} className={`py-1 text-[11px] w-full text-nowrap`} >
                                                    {row[key]}
                                                </td>
                                            )
                                    }) 
                                    }
                                </tr>
                            )
                        })}
                    </tbody> 
                    </table>
                </div>
                </BackgroundCard>
                <ToastAlert
                    alert={alert}
                    setAlert={setAlert}
                />
        </div>
    </div>
  )
}

export default SQLQueryPanel;

