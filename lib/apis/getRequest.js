
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;
 

export const getRequest = async (url, storeCache) => {
    const response = await fetch(url, {
      cache: storeCache? 'force-cache' : 'no-store', //default: force-cache
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${authToken}`,
         "Accept": "*/*"
      },
    });
    const data = await response.json(); 
    return data;
  };