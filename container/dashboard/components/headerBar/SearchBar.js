'use client'
import React from 'react'
import { MdSearch } from 'react-icons/md';
import { navs } from '@/navigation/sideDrawer/_SideDrawer';
import { handleClickCellNav } from '@/container/reports/utils/others/handleClickCellNav';
import { tabsDropdown, tabsDropdownsArr } from '@/container/reports/components/headerTab/getHeaders';
import useStoreHeader from '@/context/storeHeader';
import { useRouter } from 'next/navigation';


const SearchBar = ({chartOfAccounts, user, customers, vendors, products}) => {
    const {activePage, dispatchActivePage, dispatchIsOpen, showSidebarTitle, coy,  dispatchCoy, dispatchPageLoading} = useStoreHeader((state) => state);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchFound, setSearchFound] = React.useState([]);
    const [searchLoading, setSearchLoading] = React.useState(false);
    
    
    //console.log(customers, vendors, products)
    const handleOnChange = (e)=>{
        setSearchTerm(e.target.value);
        setSearchLoading(false);
    }
    
    const handleClickCell =(nav)=>{
       //console.log(e);
       if(nav.searchGroup === "NAVS"){
            dispatchPageLoading(true);  
            dispatchActivePage(nav);
            dispatchIsOpen(false);
            const route = `/${user.companyId}/${nav.name}`;
            router.push(route);
      }else if(nav.searchGroup === "REPORTPAGETAB"){
            const route = `/${user.companyId}/reports/${nav.name}`;
            router.push(route);
      }else if(nav.searchGroup === "COA"){
            //console.log(nav)
            const route = `/${user.companyId}/reports/gl?l=${nav.accountCode}`;
            router.push(route);
        }else if(nav.searchGroup === "CUST"){
            const route = `/${user.companyId}/reports/account-list-customers`;
            router.push(route);
        }else if(nav.searchGroup === "VED"){
            const route = `/${user.companyId}/reports/account-list-vendors`;
            router.push(route);
        }else if(nav.searchGroup === "PROD"){
            const route = `/${user.companyId}/reports/account-list-products`;
            router.push(route);
        }
        setSearchLoading(true);
    }
    //console.log(tabsDropdownsArr) account-list-vendors
    React.useEffect(()=>{
        if(searchTerm){
            const chtOfAcct = chartOfAccounts.map((dt)=> {return {...dt, searchGroup:'COA', title:`${dt.accountName} ${dt.accountCode}`}})
            const navsFmt = navs.map((dt)=> {return {...dt, searchGroup:'NAVS', title:dt.title +" Page"}});
            const reportTabs = tabsDropdownsArr.map((dt)=> {return {...dt, searchGroup:"REPORTPAGETAB"}});
            const customersFmt = customers.map((dt)=> {return {...dt, searchGroup:'CUST', title:`${dt.accountCode} ${dt.firstname} ${dt.lastname}: 
                    ${dt?.companyName} ${dt?.companyAddress} ${dt?.companyEmail} ${dt?.companyPhoneNo} ${dt?.businessType} ${dt?.email} ${dt?.phoneNo} ${dt?.region} ${dt?.residentialAddress} 
                    ${dt?.nextContactPersonName} ${dt?.nextContactPersonEmail} ${dt?.nextContactPersonPhoneNo}`}});
            const vendorsFmt = vendors.map((dt)=> {return {...dt, searchGroup:'VED', title:`${dt.accountCode} ${dt.firstname} ${dt.lastname}: 
                    ${dt?.companyName} ${dt?.companyAddress} ${dt?.companyEmail} ${dt?.companyPhoneNo} ${dt?.businessType} ${dt?.email} ${dt?.phoneNo} ${dt?.region} ${dt?.residentialAddress} 
                    ${dt?.nextContactPersonName} ${dt?.nextContactPersonEmail} ${dt?.nextContactPersonPhoneNo}`}});
            const productsFmt = products.map((dt)=> {return {...dt, searchGroup:'PROD', title:`${dt.productName} ${dt.productCode} ${dt.productCategory} ${dt.description}`}});

            const searchFrom = [...navsFmt, ...chtOfAcct, ...reportTabs, ...customersFmt, ...vendorsFmt, ...productsFmt];
            //console.log(searchFrom)
            const res = searchFrom.filter((dt)=> dt.title.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchFound(res);
        }else{
            setSearchFound([]);
        }
    },[searchTerm]);

  return (
    <div className='lg:w-[500px]'>
         <label className="input bg-white border-gray-200 input-bordered hidden smc:flex items-center gap-2 input-sm">
            <input type="text" className="grow" value={searchTerm} placeholder="Search" onChange={handleOnChange}/>
            <MdSearch size={22}/>
        </label>
        <div className={`fixed pl-3 pt-1 ${searchFound?.length? '' :'hidden'}`}>
            <div className={`relative bg-gray-200/85 py-3 border rounded-md border-blue-400 shadow-lg text-sm min-w-[250px] max-w-[450px]  max-h-[60vh] overflow-y-auto ${searchFound?.length? '' :'hidden'}`}>
                {searchLoading? <div className='absolute w-full  top-0 bottom-0 text-center flex justify-center items-center text-gray-600 bg-white/60'>
                    <p className='text-[blue]'>Loading, please wait...</p>
                </div>
                :<>
                {searchFound?.map((dt, i)=>{
                    return(
                        <p key={`${i}key`} className='px-5 py-1 cursor-pointer hover:text-[blue] hover:bg-blue-200 active:text-blue-300'
                         onClick={()=>handleClickCell(dt)}>{dt.title}</p>
                    )
                })}
                </>}
            </div>
        </div>
    </div>
  )
}

export default SearchBar