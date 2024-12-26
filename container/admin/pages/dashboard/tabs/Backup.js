'use client'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { useEffect, useState } from 'react';

const Backup = ({backupUrl, notify, backupUrlBase}) => {
  const [backupCSVFiles, setBackupCSVFiles] = useState({folders:[], data:[], res:{}, selFolder:''});
  const [selectedCSVDb, setSelectedCSVDb] = useState([]);
  const [backupSQLFiles, setBackupSQLFiles] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [backupInfo, setBackupInfo] = useState({ok:'', msg:''});
  
  //console.log(backupSQLFiles, backupUrl, backupUrlBase);

  const handleSelected =(db, bkFolder)=>{
    const sel = backupCSVFiles.res[bkFolder][db];
    setSelectedCSVDb(sel);
    setBackupCSVFiles({...backupCSVFiles, selFolder:bkFolder});
    //console.log(sel)
  }
  async function getFiles(){
    const data = {
      "act": "BACKUP_DB",
      "type": "GETFILES",
      "dir":"backup_sql"
    };
    const data_csv = {
      "act": "BACKUP_DB",
      "type": "GETFILES",
      "dir":"backup_csv"
    };
    let info = {ok:false, msg:"Error fetching data"};
    const result = await postRequest(backupUrlBase, data);
    const result_csv = await postRequest(backupUrlBase, data_csv);
    if(result.ok){setBackupSQLFiles(result.res)}
    if(result_csv.ok){
      const folders = Object.keys(result_csv.res);
      setBackupCSVFiles({folders, data:result_csv.res.backupFolders, res:result_csv.res})
    }
    //if(result_csv.ok){info = {ok:true, msg:`Backup CSV ${result?.ok? 'and SQL ' :''}data fetched successfully`}}
    //if(result.ok){info = {ok:true, msg:`Backup SQL ${result_csv?.ok? 'and CSV ' :''}data fetched successfully`}}
    
    //setBackupInfo(info);
  }

  const handleBackup = async (type)=>{
    //return console.log(type, backupUrl)
    const data = {
      "desc":"For backup, type = MYSQL || CSV. To fetch csv backups: type = GETFILES",
      "act": "BACKUP_DB",
      "type": type,
      "dir":type === "CSV"? "backup_csv" : "backup_sql"
    }
    await postRequest(backupUrlBase, data).then((result)=>{
      setBackupInfo(result);
      //console.log(result);
      if(result.ok){getFiles(backupUrlBase);}
      });
  }

  useEffect(()=>{
    getFiles(backupUrlBase);
  },[refreshData]);

  useEffect(()=>{
    if(backupInfo.msg)
    setTimeout(()=>{
      setBackupInfo({ok:'', msg:''})
    }, 10000);
  },[backupInfo]);

  //console.log(backupCSVFiles, backupSQLFiles)
  return (
    <div className='p-2 w-full'>
        <div className='flex w-full '>
                <BackgroundCard
                    title={'Backup Data'}
                    style={'flex flex-col gap-3 mr-5 h-fit'}
                    fullWidth
                >
                <div className='w-full flex flex-col lg:flex-row flex-1'>
                    <div className='flex flex-col flex-1 w-full lg:max-w-[200px] bg-red-50 mr-2 mb-2 p-2'>
                      <p className='text-center font-bold pb-3'>Backup</p>
                      <div className='flex flex-row flex-wrap gap-2 justify-around'>
                          <div className='flex flex-col gap-2'>
                            <button className='btn btn-accent btn-sm' disabled
                              onClick={()=>handleBackup("SQL")}>Backup Data- MYSQL</button>
                            <button className='btn btn-accent btn-sm'
                              onClick={()=>handleBackup("CSV")}>Backup Data- CSV</button>
                            </div>
                            
                            <button className='btn btn-info btn-sm w-full max-w-[160px] lg:mt-[80px]'
                            onClick={()=>getFiles(backupUrlBase)}>Refresh</button>
                      </div>
                      <p className={`${backupInfo.ok? 'text-green-600' : 'text-red-500'}`}>{backupInfo.msg}</p>
                    </div>
                    <div className='flex flex-1 flex-col w-full'>
                        <p className='font-bold bg-white p-2 mb-3'>Backup Files</p>
                        <div className='bg-white p-2 mb-2 w-full'>
                          <p className='font-bold'>My SQL Files</p>
                          <div>
                            <p className='text-red-500'>Terminal disabled on cpanel server probably why it is no longer working</p>
                            {backupSQLFiles?.folders?.map((databases, i)=>{
                              return(
                                <div key={`${i}key`}>
                                  <p className='text-[12px] md:text-base break-words'>
                                    {i+1}. {databases}
                                  </p>
                                  <p className='pl-3 text-[12px] md:text-base break-words text-[maroon]'>Databases</p>
                                  {backupSQLFiles?.[databases]?.map((database, i)=>{
                                    return(
                                      <p key={`${i}key`} className='pl-3 text-[12px] md:text-base break-words'
                                        >
                                        {i+1}. {database}
                                      </p>
                                    )
                                  })}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div className='bg-white p-2 mb-5 w-full'>
                          <p className='font-bold text-center pb-4 '>CSV Backup</p>
                          <div className='flex flex-col sm:flex-row'>
                              <div className='flex flex-col flex-1 items-center'>
                              <p className='font-bold text-center pb-2 '>Folders</p>
                                {backupCSVFiles?.data?.map((bkFolder, i)=>{
                                  return(
                                    <div key={`${i}key`}>
                                      <p className='font-[600] text-[12px] break-words md:text-base'
                                        >
                                        {i+1}. {bkFolder}
                                      </p>
                                      <p className='pl-3 text-[12px] md:text-base break-words text-[maroon]'>Databases</p>
                                        {backupCSVFiles?.res[bkFolder]?.dbs?.map((database, i)=>{
                                          return(
                                            <p key={`${i}key`} className='pl-3 text-[12px] md:text-base break-words cursor-pointer hover:text-[blue]'
                                              onClick={()=>handleSelected(database, bkFolder)}>
                                              {i+1}. {database}
                                            </p>
                                          )
                                        })}
                                    </div>
                                  )
                                })}
                              </div>
                              <div className={`flex flex-col flex-1 items-start justify-start ${selectedCSVDb?.length? '' : 'hidden'}`}>
                                <div className='flex flex-col flex-1 items-start justify-start p-2 bg-gray-100 h-fit'>
                                  <p className='font-bold text-left pb-2 '>Folder: {backupCSVFiles.selFolder}</p>
                                  <p className='font-bold text-center pb-2 '>Files</p>
                                     {selectedCSVDb?.map((db,i)=>{
                                        return(
                                          <p key={`${i}key`} className='pl-3 text-[12px] md:text-base break-words cursor-pointer hover:text-[blue]'
                                            >
                                            {i+1}. {db}
                                          </p>
                                        )
                                     })

                                     }
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                </BackgroundCard>
        </div>
    </div>
  )
}

export default Backup;




