'use client'
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { useEffect, useState } from 'react';


const Backup = ({backupUrl}) => {
  const [backupCSVFiles, setBackupCSVFiles] = useState({folders:[], data:{}});
  const [backupCSVFile, setBackupCSVFile] = useState("");
  const [backupSQLFiles, setBackupSQLFiles] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  
  const handleSelected =(dt)=>{
    setBackupCSVFile(backupCSVFile? "" : dt)
  }
  async function getFiles(url){
    const data = {
      "act": "DB_BACKUP",
      "type": "GETFILES_SQL"
    };
    const data_csv = {
      "act": "DB_BACKUP",
      "type": "GETFILES_CSV"
    };
  
    const result = await postRequest(url, data);
    const result_csv = await postRequest(url, data_csv);
    if(result.ok){setBackupSQLFiles(result.res)}
    if(result_csv.ok){
      const folders = Object.keys(result_csv.res);
      setBackupCSVFiles({folders, data:result_csv.res})}
  }

  const handleBackup = async (act)=>{
    const data = {
      "desc":"For backup, type = MYSQL || CSV. To fetch backups: type = GETFILES_CSV || GETFILES_SQL",
      "act": "DB_BACKUP",
      "type": act,
      "dir":act === "CSV"? "backup_csv" : "backup_sql"
    }
    await postRequest(backupUrl, data).then((result)=>{
      if(result.ok){getFiles(backupUrl);}
      });
  }

  useEffect(()=>{
    getFiles(backupUrl);
  },[refreshData]);

  //console.log(backupCSVFiles, backupSQLFiles)
  return (
    <div className='p-2 w-full'>
        <div className='flex w-full '>
                <BackgroundCard
                    title={'Backup Data'}
                    style={'flex flex-col gap-3 mr-5 h-fit'}
                >
                <div className='w-full flex flex-col lg:flex-row '>
                    <div className='flex flex-col flex-1 w-full lg:max-w-[200px] bg-red-50 mr-2 mb-2 p-2'>
                      <p className='text-center font-bold pb-3'>Backup</p>
                      <div className='flex flex-row flex-wrap gap-2 justify-around'>
                          <div className='flex flex-col gap-2'>
                            <button className='btn btn-accent btn-sm'
                              onClick={()=>handleBackup("MYSQL")}>Backup Data- MYSQL</button>
                            <button className='btn btn-accent btn-sm'
                              onClick={()=>handleBackup("CSV")}>Backup Data- CSV</button>
                            </div>
                            
                            <button className='btn btn-info btn-sm w-full max-w-[160px] lg:mt-[80px]'
                            onClick={()=>getFiles(backupUrl)}>Refresh</button>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <p className='font-bold bg-white p-2 mb-3'>Backup Files</p>
                        <div className='bg-white p-2 mb-2'>
                          <p className='font-bold'>My SQL Files</p>
                          <div>
                            {backupSQLFiles?.map((dt, i)=>{
                              return(
                                <p key={`${i}key`} className='text-[12px] md:text-base break-words'>{i+1}. {dt}</p>
                              )
                            })}
                          </div>
                        </div>
                        <div className='bg-white p-2 mb-5'>
                          <p className='font-bold'>CSV Files</p>
                          <div>
                            {backupCSVFiles?.folders?.map((dt, i)=>{
                              return(
                                <div key={`${i}key`}>
                                  <p className='cursor-pointer hover:text-[blue] active:text-blue-200 text-[12px] break-words md:text-base'
                                    onClick={()=>handleSelected(dt)}>{i+1}. {dt}</p>
                                    {dt === backupCSVFile && backupCSVFiles?.data[backupCSVFile]?.map((dt, i)=>{
                                      return(
                                        <p key={`${i}key`} className='pl-3 text-[12px] md:text-base break-words'>{i+1}. {dt}</p>
                                      )
                                    })}
                                </div>
                              )
                            })}
                            
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




