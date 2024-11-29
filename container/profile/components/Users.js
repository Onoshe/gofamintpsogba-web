import Table from '@/components/tables/Table';
import TableViewOnly from '@/components/tables/TableViewOnly'
import { capitalizeFirstCharOnly } from '@/lib/capitalize/capitalizeString';
import React from 'react';




const Users = ({users, handleClickCell, handleAddUser, planLimit}) => {
    let headers, rows, rowKeys = []; 
    const updateClassName = "bg-blue-400 text-white py-1 px-2 rounded-sm cursor-pointer active:bg-blue-300 hover:bg-blue-500";
    const adminClass = "bg-gray-200 text-black py-1 px-2 rounded-sm";
    const resetClassName = "bg-red-400 text-white py-1 px-2 rounded-sm cursor-pointer active:bg-red-300 hover:bg-red-500";

    //console.log(users, planLimit)
    let disableAddBtn = false;
    let showAddBtn = false;
    if(users?.length){  
     disableAddBtn = users?.length >= planLimit;
    };
    if(planLimit){
      showAddBtn = true;
    }

    if(users?.length){
        rowKeys = Object.keys(users[0]);
        //const rowsFilter = rowKeys.filter(k=> !['userName', 'role', 'nonActive', 'deleted'].includes(k));
        rowKeys = ['update', 'userName', 'role', 'status', 'firstname', 'lastname', 'email', 'title','phoneNo', 'recoveryEmail', 'reset', 'registeredDate', 'updatedAt', 'createdAt'];
        //rowKeys = rowKeys.filter((dt)=> dt)
        headers = rowKeys.map((hd)=> {
          return {title:hd==="reset"? "Reset Pwd" :capitalizeFirstCharOnly(hd), className:''}
        });
        
        rows = [...users].map((u)=> { 
          return u.role.toLowerCase() !== "admin"? {
            update:'Edit', delete:'Delete', reset:'Reset', updateClassName, resetClassName, status:parseInt(u.nonActive)? 'Non-active': 'Active', statusClassName:parseInt(u.nonActive)? 'text-red-600' :'text-green-500', ...u} :
          {update:'Edit', delete:'Delete', reset:'Reset', updateClassName:adminClass, resetClassName:adminClass, status:parseInt(u.nonActive)? 'Non-active': 'Active', statusClassName:parseInt(u.nonActive)? 'text-red-600' :'text-green-500', ...u}
        });
    }
   // console.log(rows)
//console.log(headers, rows, rowKeys)

  return (
    <div>
        <p className='py-2 font-[700] text-blue-800'>Registered Users</p>
        <Table
            header={headers} 
            rows={rows}
            rowKeys={rowKeys} 
            clickableHeader={false} 
            onClickHeader={''} 
            clickableRow={false} 
            onClickRow={''}
            clickableRowCellKeys={['update', 'reset']}
            clickableRowCell={true} 
            onClickRowCell={handleClickCell}
            classNameHeaderTR={'bg-gray-300'} 
            classNameHeaderTd="py-3" 
            classNameRowsTd="py-2"
        />
        <br/>
        <div className={`${showAddBtn? '' : 'hidden'}`}>
          <button className={`btn btn-sm text-[12px]  ${disableAddBtn? 'btn-disabled' : 'btn-accent'}`} onClick={handleAddUser}>Add New User</button>
          <p className={`text-sm text-red-700 italic py-2 ${disableAddBtn? '' : 'hidden'}`}>
              You have reach your maximum quota. To be able to add more users, kindly upgrade to a higher plan
          </p>
        </div>
    </div>
  )
}

export default Users