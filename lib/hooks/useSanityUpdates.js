'use client'
import { useEffect, useState } from "react";
//https://www.sanity.io/guides/real-time-data-visualization-with-react-charts-and-sanity-listeners
//https://dmitripavlutin.com/javascript-fetch-async-await/


const useSanityListener = (client) => {
  const [fetchedDatas, setFetchedDatas] = useState([]); 

  //Listen for data changes in Sanity
  const queryControl = `*[ _type == 'controls' && title == 'Show Advert' ]{
    'advertcontrols': togglecontrol[group == 'showadvert']{name,title, toggle},
  }
  `;
  const params = {};
  
  fetchDataCall();
  /*client.fetch(queryControl).then((data) => {
    const advertControls = data[0]['advertcontrols'];
    const pairRes = pairKeyValue(advertControls, ['name', 'toggle']);
    setFetchedControls(pairRes);
  });*/


  useEffect(() => {
    const subscription = client
    .listen(queryControl)
    .subscribe(response => {
        //console.log(response.result);
        //fetchDataCall();
        //console.log(JSON.stringify(newRecords.result, null, 4));

        const advertControls = response[0]['advertcontrols'];
        console.log(advertControls);
        setFetchedDatas(advertControls);
    })
    
    
    
    return () => {
        subscription.unsubscribe();
    };
  }, [client]);

  function fetchDataCall(){
    client.fetch(queryControl).then((data) => {
        const advertControls = data[0]['advertcontrols'];
        console.log(advertControls);
        setFetchedDatas(advertControls)
      });
  }


  return {fetchedDatas, setFetchedDatas  };
};

export default useSanityListener;