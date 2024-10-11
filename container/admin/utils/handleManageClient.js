import { postRequest } from "@/lib/apiRequest/postRequest";
import { manageClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { handlePasscode } from "./handlePasscode";
import { dbTables,dbTablesRemove } from "./handleCreateClient";


export const handleManageClient = async (form, alert, setAlert, handleRevalidate, clientTables)=>{
    let isError = true;
    //return console.log(form)
    if(!form.domain || !form.passcode || !form.actType){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
        }else{
            
        if(form.actType === "ACTIVATE" || form.actType === "DEACTIVATE" || form.actType === "REMOVE"){
            const {url, body} = manageClientQuery(form, 'ISCLIENT');
            const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
             //If table Exist for client domain
             if(form.actType === "REMOVE"){
                if(form?.autoRemoveTables){
                    //First remove tables
                        const bodyFmt = {act:"DROP", tables:dbTablesRemove, "domain":form?.domain,};
                        //console.log(bodyFmt)
                        
                        const coyTableExist = checkIfClientTableExist(clientTables, form.domain);
                        //console.log(url, bodyFmt)
                        if(coyTableExist){
                            await patchRequest(url, bodyFmt)
                            .then((res)=> {
                                console.log(res)
                                setAlert({...alert, msgTitle:'Tables for client with domain '+form.domain+' deleted successully', msg:'', type:'success', show:true});
                                handleRevalidate('DBTABLES');
                            });         
                        }else{
                           await runRemoveClient(url, body, alert, setAlert, handleRevalidate);   
                        }
                }else{
                    const coyTableExist = checkIfClientTableExist(clientTables, form.domain);
                    //console.log(coyTableExist)
                    if(coyTableExist){
                        return setAlert({...alert, msgTitle:'Client cannot be deleted.  Tables exist for client', msg:'', type:'error', show:true});     
                    }else{
                       await runRemoveClient(url, body, alert, setAlert, handleRevalidate);   
                    }
                }
                
             }else{
                await runRemoveClient(url, body, alert, setAlert, handleRevalidate);
             }    
            }
        }else if(form.actType === "DROP"){
            //First remove tables
            form.domain = "DEMO";
            const bodyFmt = {act:"DROP", tables:dbTablesRemove, "domain":form?.domain,};
            //console.log(bodyFmt)
            
            const coyTableExist = checkIfClientTableExist(clientTables, form.domain);
            //return console.log(coyTableExist, dbTablesRemove, form)
            if(coyTableExist){
                await patchRequest(url, bodyFmt)
                .then((res)=> {
                    //console.log(res)
                    setAlert({...alert, msgTitle:'Tables for client with domain '+form.domain+' deleted successully', msg:'', type:'success', show:true});
                    handleRevalidate('DBTABLES');
                });         
            }else{
                await runRemoveClient(url, body, alert, setAlert, handleRevalidate);   
            }
        }else{ //CREATE
               if(!form.tables.length){form.tables = []}; 
                const {url, body} = manageClientQuery(form);
                //return
                const passcodeRes = await handlePasscode(form);
                
                if(!passcodeRes?.ok){
                    setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
                }else{
                    await patchRequest(url, body)
                        .then((res)=> {
                            //console.log(res)
                            if(!res?.ok){
                                setAlert({...alert, msgTitle:res.error, type:'error', show:true});
                            }else{
                                setAlert({...alert, msgTitle:res?.msg? res?.msg : typeof res?.data == "string"? res.data : '', type:'success', show:true});
                                handleRevalidate('DBTABLES');
                                setAlert({...alert, msgTitle:"Tables created successfully", type:'success', show:true});
                            }
                        });
                }
           // }else{
           //     setAlert({...alert, msg:'Please select tables', type:'error', show:true});
           // }
        }  
  }
}



async function runRemoveClient(url, body, alert, setAlert, handleRevalidate){
    return await patchRequest(url, body)
        .then((res)=>{
            //console.log(res)
            setAlert({...alert, msgTitle:res.msg, msg:'', type:'success', show:true});
            handleRevalidate('CLIENTS');
    });
}

function checkIfClientTableExist(clientTables, domain){
    let tableExist = false;
    clientTables?.forEach(el => {
        if(el.TABLE_NAME.toLowerCase().includes(domain.toLowerCase()+"_")){
           // console.log([el.TABLE_NAME.toLowerCase(), domain.toLowerCase()+"_", el])
          return  tableExist = true
        }       
    });
    return tableExist;
}