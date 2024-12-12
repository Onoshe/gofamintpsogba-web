"use client";

//import { getRequest } from "../apiSqlRequest/getRequest";
//const { default: useSWR } = require("swr");
import useSWR from "swr";
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;


const fetcher = async (url) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
      });
    
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }
  
    return data;
  };

  
export const useSWRFetcher = (urlKey) =>{
    const results = useSWR(urlKey, fetcher);

    return results
 } 
