'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import RadioBtn from '@/container/admin/components/reusableComponents/RadioBtn';
import Checkbox, { CheckboxSingle } from '@/container/admin/components/reusableComponents/Checkbox';
import ToastAlert from '@/components/toast/ToastAlert';
import { handleManageClient } from '@/container/admin/utils/handleManageClient';
import Selections from '@/container/admin/components/reusableComponents/Selections';
import TextInputPasscode from '@/container/admin/components/reusableComponents/TextInputPasscode';



const ManageClients = ({clientsData, handleRevalidate, clientTables}) => {
    const [form, setForm] = useState({db:'', tables:[], domain:'', autoRemoveTables:true, passcode:'',passcodeSlug:'', clientId:'', actType:'CREATE'})
    const [checkboxData, setCheckboxData] = useState([]);
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    const [disableTables, setDisableTables] = useState(false);
    const [disableClients, setDisableClients] = useState(false);
    let clientsFmt = [...clientsData].map((tb)=> { return {...tb, value:tb.companyDomain, title:`${tb.id} ${tb.companyName}- (${tb.companyDomain}) [${parseInt(tb.inactive)? 'INACTIVE' :'ACTIVE'}]`, name:tb.companyDomain}})
    clientsFmt = [{value:'', title: '--- Select Client ---', name:'SELECT',  }, ...clientsFmt];

    //console.log(form);

   const onChangeHandler =(e)=>{
        const {name, value} = e.target;
        //console.log(name, value)
        if(name==="RADIOACT"){
            if(value === "ACTIVATE" || value === "DEACTIVATE" || value === "REMOVE"){
                setDisableTables(true)
            }else{setDisableTables(false)}
            setForm({...form, actType:value, tables:[]});
        }else if(name==="domain"){
            const client = clientsData.find((dt)=> dt.companyDomain === value);
            const clientId = client?.id? client.id : '';
            setForm({...form, [name]:value, clientId, });
        }else if(name==="autoRemoveTables"){
            const newVal = !form.autoRemoveTables;
            if(newVal && form.actType === "REMOVE"){setDisableTables(true)}else{setDisableTables(false)} 
            setForm({...form, autoRemoveTables:newVal})
        }else{
            setForm({...form, [name]:value})
        }
   }

   const onChangeCheckbox =(el)=>{
    const {title, checked} = el;
    if(form?.tables?.includes(title)){
        const newTables = form.tables.filter(e => e !== title);
        setForm({...form, tables:newTables})
    }else{
        setForm({...form, tables:[...form.tables, title]})
    }

}
  
   const handleSubmit = async (e)=>{
    e.preventDefault();
    handleManageClient(form, alert, setAlert, handleRevalidate, clientTables);
   }


   useEffect(()=>{
    const createTables = ['COASTRUCTURE', 'CHARTOFACCOUNT', 'CUSTOMERS', 'VENDORS', 'PRODUCTS', 'TRANSACTIONSDETAILS', 'TRANSACTIONS', 'ACTIVITYLOG', 'USERSACCOUNT','SETTINGS', 'RECONCILIATION'];
    const insertTables = ['COASTRUCTURE', 'CHARTOFACCOUNT', 'CUSTOMERS', 'VENDORS', 'PRODUCTS', ];
    const dropTables = ['COASTRUCTURE', 'CHARTOFACCOUNT', 'CUSTOMERS', 'VENDORS', 'PRODUCTS', 'TRANSACTIONSDETAILS', 'TRANSACTIONS', 'ACTIVITYLOG', 'USERSACCOUNT', 'SETTINGS', 'RECONCILIATION'];
    if(form.actType === "CREATE"){
        const tables = createTables.map((el)=> {return {title:el}});
        setCheckboxData(tables);
    }else if(form.actType === "INSERT"){
        const tables = insertTables.map((el)=> {return {title:el}});
        setCheckboxData(tables);
    }else if(form.actType === "DROP"){
        const tables = dropTables.map((el)=> {return {title:el}});
        setCheckboxData(tables);
    }
  },[form.actType]);
  

  return (
    <div className='p-4 mb-6 '>
        <div className='flex w-full flex-col lg:flex-row'>
                <BackgroundCard
                    title={['CREATE', 'INSERT', 'DROP'].includes(form.actType)? 'Manage Client Table' : 'Manage Client'}
                    style={'flex flex-col gap-3 mr-5 h-fit'}
                >
                    <p>Table actions</p>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <div className='flex gap-2 flex-wrap'>
                            <RadioBtn title="CREATE"
                                name="RADIOACT"
                                value="CREATE"
                                checked={form.actType === "CREATE"}
                                onChange={onChangeHandler}
                            />
                            <RadioBtn title="INSERT"
                                name="RADIOACT"
                                value="INSERT"
                                checked={form.actType === "INSERT"}
                                onChange={onChangeHandler}
                            />
                            <RadioBtn title="ACTIVATE"
                                name="RADIOACT"
                                value="ACTIVATE"
                                checked={form.actType === "ACTIVATE"}
                                onChange={onChangeHandler}
                            />
                            <RadioBtn title="DEACTIVATE"
                                name="RADIOACT"
                                value="DEACTIVATE"
                                checked={form.actType === "DEACTIVATE"}
                                onChange={onChangeHandler}
                            />
                            <RadioBtn title="REMOVE"
                                name="RADIOACT"
                                value="REMOVE"
                                checked={form.actType === "REMOVE"}
                                onChange={onChangeHandler}
                            />
                            {/*<RadioBtn title="DROP"
                                name="RADIOACT"
                                value="DROP"
                                checked={form.actType === "DROP"}
                                onChange={onChangeHandler}
                            />*/}
                        </div>
                        <p className='px-2 pb-4 text-blue-700'>{actTypeMsg[form.actType]}</p>
                        <Selections
                            title="Select Client"
                            name="domain"
                            data={clientsFmt}
                            onChange={onChangeHandler}
                            disable={disableClients}
                            domain={form.domain}
                        />
                         {!["ACTIVATE", "DEACTIVATE"].includes(form?.actType) &&
                         <><CheckboxSingle
                            title="Remove all Client Tables"
                            form={form}
                            name="autoRemoveTables"
                            label = "Auto remove Client database Tables"
                            onChangeHandler={onChangeHandler}
                            //disable={disableTables}
                        />                
                        <Checkbox
                            title="Base Tables"
                            form={form}
                            data={checkboxData}
                            onChange={onChangeCheckbox}
                            disable={disableTables}
                        /></>}
                        <TextInputPasscode
                            onChange={onChangeHandler}
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

export default ManageClients;

var actTypeMsg = {
    CREATE: "Create Table(s) for new Client.",
    INSERT: "Insert default data into new Client's Table",
    ACTIVATE: "Activate Client's account",
    DEACTIVATE: "Deactivate Client's account",
    REMOVE: "Delete Client's account",
    DROP: "Delete Client's Table(s)",
};