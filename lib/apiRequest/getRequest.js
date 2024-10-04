
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;
//https://quickrecords.gofamintpsogba.org/server.php/api/fetch?t=demo_usersaccount&c=userId&v=DEMO@sunday.adegboye
 

export const getRequest = async (url) => {
   //return console.log(url);
    const response = await fetch(url, {

      method: 'GET',
      headers: {
        "Authorization": `Bearer ${authToken}`,
         "Accept": "*/*"
         //"User-Agent": "Thunder Client (https://www.thunderclient.com)"
      },
    });
    const data = await response.json(); // Corrected line
    //console.log(data, url)
    return data;
  };