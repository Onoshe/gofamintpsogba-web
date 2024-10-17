import { BiEditAlt, BiTrash } from "react-icons/bi";


function getEditClass(dt){
  return  dt.createdBy==="DEMO"? 'text-gray-400' :'cursor-pointer text-blue-700 hover:text-[blue]'
}
function getDeleteClass(dt){
    return  dt.createdBy==="DEMO"? 'text-gray-400' :'text-red-700 cursor-pointer hover:text-[red]'
  }

export const getDefaultCOA = (chartOfAccounts)=>{

    return chartOfAccounts.map((dt)=>{
        const editBtn = <BiEditAlt size={22} className={`${getEditClass(dt)}`}/>;
        const deleteBtn = <BiTrash size={22} className={`${getDeleteClass(dt)}`}/>;

        return {...dt, 
            edit: editBtn,
            delete: deleteBtn, 
            addToDashboard:parseInt(dt?.addToDashboard)? 'Yes' :'No'
        }
    })
}

export const getDefaultProductList = (productsList)=>{
    return productsList.map((dt)=>{
        return {...dt, 
            edit:<BiEditAlt size={22} className={`${getEditClass(dt)}`}/>,
            delete:<BiTrash size={22} className={`${getDeleteClass(dt)}`}/>, 
        }
    })
}


export const getDefaultPersonalAcct = (el, personalAccount)=>{
    //console.log(personalAccount)
    return personalAccount.map((dt)=>{
        return {
            ...dt,
            accountCode:dt.accountCode?.replace('V-', el), 
            edit: <BiEditAlt size={22} className={`${getEditClass(dt)}`}/>,
            delete:<BiTrash size={22} className={`${getDeleteClass(dt)}`}/>, 
        }
    })
}

