import { getPdfServer } from "./urlLinks";

const authToken = process.env.NEXT_PUBLIC_DBTOKEN;


export const postRequest = async (url, postData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(postData)
  });

  const data = await response.json();
  return data;
};


export const postEmailRequest = async (user, postData) => {
  const postUrl = getPdfServer('qr_'+user?.companyId?.toLowerCase());
  const response = await fetch(postUrl, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(postData)
  });

  const data = await response.json();
  return data;
};



export const postRequestFormData = async (url, postData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: postData
  });

  const data = await response.json();
  return data;
};