'use client'
import React from 'react';
import TableWithPinnedView from '@/components/tables/TableWithPinnedView';
import { MdClear, MdSearch } from 'react-icons/md';
import { ExcelIcon } from '../icons/iconsSvg';
import ToolsBar from './ToolsBar';
import useStoreTransactions from '@/context/storeTransactions';
import { getCompanyLogo } from '@/container/company/components/utils/getSubscriptionHistory';
import useStoreHeader from '@/context/storeHeader';



const AllPersonalAccount = ({personalAccounts,handleClickCell, searchName, searchValue,onChangeSearch, handleClear, handleSearch,
    handleExportToExcel, personalAcctType}) => {
    const  {clientAccount, runDispatchClientDataCall} = useStoreTransactions((state) => state);
    const {settings} = useStoreHeader((state) => state);
    const companyLogoFile = getCompanyLogo(settings);

  const [showAllRows, setShowAllRows] = React.useState(false);

  const rowKeysMain = ['edit', 'type', 'title', 'accountCode', 'firstname', 'othernames', 'lastname', 'formNo', 'dob', 'phoneNo', 'email', 'accountGroup', 'residentialAddress'];
  const rowKeysOthers = ['position', 'nextContactPersonName', 'nextContactPersonPhoneNo', 'nextContactPersonEmail', 'companyName', 'companyPhoneNo', 'companyEmail', 'companyAddress', 
  'businessType', 'region', 'country', 'state', 'zip', 'registeredDate', 'info'];

  const rowKeysShow = showAllRows? [...rowKeysMain, ...rowKeysOthers] : rowKeysMain;
  const rowHeaders = [{title:'Edit', name:'edit'},
                      {title:'Type', name:'type'}, {title:'Title',  name:'title'}, {title:'Account Code',  name:'accountCode'}, {title:'Firstname',  name:'firstname'}, {title:'Othernames',  name:'othernames'}, 
                      {title:'Lastname',  name:'lastname'}, {title:'Birthday',  name:'dob'}, {title:'Phone No',  name:'phoneNo'}, {title:'Email',  name:'email'}, {title:'Residential Address',  name:'residentialAddress'},
                      {title:'Form No',  name:'formNo'}, {title:'Position',  name:'position'}, {title:'Next Contact Person Name', name: 'nextContactPersonName'}, {title:'Next Contact Person Phone No', name:'nextContactPersonPhoneNo'}, 
                      {title:'Next Contact Person Email', name:'nextContactPersonEmail'}, {title:'Company Name', name:'companyName'}, {title:'Company Phone No', name:'companyPhoneNo'}, {title:'Company Email', name:'companyEmail'}, 
                      {title:'Company Address', name:'companyAddress'}, {title:'Buisness Type', name:'businessType'}, {title:'Region', name:'region'}, {title:'Country', name:'country'}, {title:'State', name:'state'}, {title:'Zip Code', name:'zip'},
                      {title:'Registered Date', name:'registeredDate'}, {title:'Additional Information', name:'info'},
                      {title:'Group', name:'accountGroup'}];

  return (
    <div className='w-[lg:w-[calc(100vw-300px)] mx-4 overflow-x-auto overflow-hidden'>
        <label className="input flex items-center gap-2 mt-3 bg-transparent  border-blue-100 shadow-sm shadow-blue-400"
         >
          <input type="text" className="grow " placeholder="Search" name={searchName} onChange={onChangeSearch} value={searchValue}/>
          {searchValue && <MdClear size={22} className='cursor-pointer over-text-blue-500 text-red-600' onClick={handleClear}/>}
          <MdSearch size={22} className='cursor-pointer over-text-blue-500' onClick={handleSearch}/>
        </label>
          <ToolsBar
            showAllRows={showAllRows}
            setShowAllRows={setShowAllRows}
            handleExportToExcel={handleExportToExcel}
            personalAccounts={personalAccounts}
            personalAcctType={personalAcctType}
            clientAccount={clientAccount}
            companyLogoFile={companyLogoFile}
          />
          <TableWithPinnedView
            classNameTable={"overflow-x-auto max-h-[65vh] overflow-y-auto"}
            header={[{className:'bg-blue-50 py-5', title:''}, ...rowHeaders]}
            rowKeys={rowKeysShow}
            rows={personalAccounts}
            classNameHeaderTR="bg-blue-50" 
            classNameRowsTR="border border-gray-200 hover:bg-blue-50"
            clickableHeader={false}
            //onClickHeader={(e)=>console.log(e)}
            clickableRowCell={true}
            clickableRowCellKeys ={['edit']}
            onClickRowCell={handleClickCell}
          />
      </div>
  )
}

export default AllPersonalAccount