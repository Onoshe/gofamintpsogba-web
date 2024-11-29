import { postRequest } from "@/lib/apiRequest/postRequest";
import { manageClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { handlePasscode } from "./handlePasscode";
import { dbTables,dbTablesRemove } from "./handleCreateClient";
import { getLinkClientServer } from "@/lib/apiRequest/urlLinks";


export const handleManageClient = async (form, alert, setAlert, handleRevalidate, clientTables)=>{
    let isError = true;
    //return console.log(form)
    if(!form.domain || !form.passcode || !form.actType){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
        }else{
            
        if(form.actType === "ACTIVATE" || form.actType === "DEACTIVATE" || form.actType === "REMOVE" ){
            const {url, body} = manageClientQuery(form, 'ISCLIENT');
            const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
             //If table Exist for client domain
             const domain = form.domain.toLowerCase();
             let body = {
                "act":"DROP_CLIENT",
                "domain":domain,
                "clientId":form.clientId,
                "table":"_clients"
              };
              const urlDrop = getLinkClientServer(domain).server;

             if(form.actType === "REMOVE"){
                await postRequest(urlDrop, body)
                .then((res)=> {
                    if(res.ok){
                        setAlert({...alert, msgTitle:"Client, '"+domain+"' dropped successfully", msg:'', type:'success', show:true});
                        handleRevalidate('DBS');
                        handleRevalidate('CLIENTS');
                        handleRevalidate('DBTABLES');
                    }
                }); 
             }else {
                body = {...body, "act": form.actType};
                await postRequest(urlDrop, body)
                .then((res)=> {
                    if(res.ok){
                        setAlert({...alert, msgTitle:res.msg, type:res.ok? 'success' : 'error', show:true});
                        handleRevalidate('DBS');
                        handleRevalidate('CLIENTS');
                        handleRevalidate('DBTABLES');
                    }
                });
             }    
            }
        }else if(form.actType === "CREATE" || form.actType === "ALTER"){ //Create tables if not exist
               
                if(!form.autoRemoveTables && !form.tables.length){
                  return  setAlert({...alert, msgTitle:'Please, set tables to create', msg:'', type:'error', show:true});
                }; 
                let tablesToCreate = [];
                form?.tables?.forEach(el => {
                    if(el){tablesToCreate.push(el)}
                });
                const passcodeRes = await handlePasscode(form);
                if(!passcodeRes?.ok){
                    setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
                }else{
                    const domain = form.domain.toLowerCase();
                    const url = getLinkClientServer(domain).server;
                    //let autoCreateAllTables = form.utoRemoveTables;
                    //if(form.actType === "CREATE"){
                    if(form.actType === "CREATE"){
                        //Create new client tables
                        const body = {
                            "act":"CREATE_CLIENT_TABLES",
                            "domain":domain,
                            "clientId":form?.clientId,
                            "tables":tablesToCreate,
                             "autoCreateAllTables":form.autoRemoveTables,
                            "table":domain+"_usersaccount" //Dommy 
                          };
                        await postRequest(url, body)
                        .then((res)=> console.log(res));
                    }else{
                        const body = {
                            "act":form.actType,
                            "domain":domain,
                            "tables":tablesToCreate,
                             "autoCreateAllTables":form.autoRemoveTables
                            //"table":domain+"_usersaccount"
                        };
                        await postRequest(url, body)
                            .then((res)=> {
                                console.log(res)
                                if(!res?.ok){
                                    const msg = typeof(res.msg) === "object"? "Error in performing action" : res.msg;
                                    setAlert({...alert, msg:res.msg?.error, msgTitle:msg, type:'error', show:true});
                                }else{
                                    const msgTitle = form.actType==="CREATE"? "Tables created successfully" : "Tables deleted successfully";
                                    setAlert({...alert, msgTitle:res?.msg? res?.msg : typeof res?.data == "string"? res.data : '', type:'success', show:true});
                                    handleRevalidate('DBTABLES');
                                    setAlert({...alert, msgTitle, type:'success', show:true});
                                }
                            });
                        }
                    
                }
        }else{
            setAlert({...alert, msgTitle:'Unknown actType', msg:'', type:'error', show:true});
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