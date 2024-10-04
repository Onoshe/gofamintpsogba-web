'use client'
import React from "react";
import useStoreHeader from "@/context/storeHeader";





const PageWrapper = ({children, classNameCont}) => {
    //const { data: session, status } = useSession();
    const { coy, dispatchPageLoading, dispatchCoy, dispatchActivePage} = useStoreHeader((state) => state);
    //const domain = session?.user?.userId?.split("@")[0]?.toLowerCase();


    React.useEffect(()=>{
        dispatchPageLoading(false);
    },[]);


    React.useEffect(()=>{
        //if(status !== "authenticated"){
           // router.push('/');
        //}
    },[]);

    return (
        <div className={`bg-white w-full pt-[70px] min-h-screen ${classNameCont}`}>
            {children}
        </div>
  )
}


export default PageWrapper;


