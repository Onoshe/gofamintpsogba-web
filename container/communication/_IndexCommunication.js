'use client'
import React, { useState } from 'react';
import IndexHeaderTabs from './headerTab/_IndexHeaderTabs';
import getHeaders from './headerTab/getHeaders';
import IndexSendMail from './tabs/sendMail/IndexSendMail';
import { usePathname, useRouter } from 'next/navigation';
import  IndexSendMonthlyStatement  from './tabs/sendMonthlyStatement/IndexSendMonthlyStatement';
import IndexSendStatement from './tabs/sendStatement/IndexSendStatement';
import useStoreHome from '@/context/storeHome';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { getCompanyLogo } from '../company/components/utils/getSubscriptionHistory';
import useStoreHeader from '@/context/storeHeader';
import useStoreTransactions from '@/context/storeTransactions';
import { LedgersManager } from '../reports/utils/ledgers/ledgersManger';

const headerTab = getHeaders();
const today = new Date().toISOString().split("T")[0];
const year = new Date().getFullYear();

const IndexCommunication = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const coyDomain = user?.companyId?.toLowerCase();
  const [reportDate, setReportDate] = useState({startDate:year+'-01-01', endDate:today}); 
  const [statementDate, setStatementDate] = React.useState('');
  const {coaStructure, transactions, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, clientAccount,
    dispatchReportDate, runDispatchClientDataCall, currencySymbol} = useStoreTransactions((state) => state);
    let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  let headerTabsArr = Object.keys(headerTab);
  headerTabsArr = coyDomain === "kosofe"? headerTabsArr :  headerTabsArr?.filter((el)=> el !=='SENDMONTHLYSTATEMENT');

    const customersLedgerObj = transProcessor.getPersonalAccounts("customersLedger", {startDate:'2022-01-01', endDate:statementDate});
    const vendorsLedgerObj = transProcessor.getPersonalAccounts("vendorsLedger", {startDate:'2022-01-01', endDate:statementDate});
    const customersLedgerArr = Object.values(customersLedgerObj);
    const vendorsLedgerArr = Object.values(vendorsLedgerObj);


  const {settings, toastNotice, dispatchToastNotice, clientData,} = useStoreHeader((state) => state);
  const {form, dispatchForm, dispatchResetForm, resetPwdInfo, dispatchResetPwdInfo} = useStoreHome((state) => state);
  //const {dispatchActivePage, dispatchCoy, dispatchPageLoading } = useStoreHeader((state) => state);
  const [activeTab, setActiveTab] = React.useState(headerTab.SENDMAIL);
  const router = useRouter();
  const pathname = usePathname();
  const companyLogo = getCompanyLogo(settings);
  const companyDetails = {name:clientData?.companyName, address:clientData?.address};
  const coyLogoUrl = `https://quickrecords.gofamintpsogba.org/image_server.php?image=${coyDomain?.toUpperCase()}@LOGO&isLogo=TRUE`;


  const notify =(type, msg)=>{
    dispatchToastNotice({type, msg, count:parseInt(toastNotice.count)+1})
  }

  const activeTabDisplay = {
    SENDMAIL: <IndexSendMail notify={notify} user={user} companyDetails={companyDetails} companyLogo={companyLogo}/>,
    SENDSTATEMENT:<IndexSendStatement 
      reportDate={reportDate} 
      setReportDate={setReportDate} 
      transProcessor={transProcessor}
      customers={customers}
      vendors={vendors}
      clientData={clientData}
      currencySymbol={currencySymbol}
      companyDetails={companyDetails}
      companyLogoFile={companyLogo}
      user={user}
      notify={notify}
      coyLogoUrl={coyLogoUrl}
      customersLedgerArr={customersLedgerArr}
      vendorsLedgerArr={vendorsLedgerArr}
      statementDate={statementDate}
      setStatementDate={setStatementDate}
      />,
    SENDMONTHLYSTATEMENT:<IndexSendMonthlyStatement 
      user={user}
      customers={customers}
      vendors={vendors}
      customersLedgerArr={customersLedgerArr}
      vendorsLedgerArr={vendorsLedgerArr}
      companyDetails={companyDetails}
      companyLogoFile={companyLogo}
      notify={notify}
      />
  }


  return (
    <div  data-theme='light' className='overflow-x-hidden min-h-screen'>
        <IndexHeaderTabs
            selectedTab={activeTab} 
            headerTab={headerTab}
            setSelectedTab={setActiveTab}
            headersArr={headerTabsArr}
        />
          <>
              {activeTabDisplay[activeTab.name]}
            
          </>
    </div>
  )
}

export default IndexCommunication;