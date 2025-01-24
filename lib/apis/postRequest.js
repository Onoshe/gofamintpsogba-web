const authToken = process.env.NEXT_PUBLIC_DBTOKEN;


export const postRequest = async (url, postData, contentType) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType? contentType : 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(postData)
  });

  const data = await response.json();
  return data;
};



export const postRequestForm = async (url, postData, contentType) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType? contentType : 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: postData
  });

  const data = await response.json();
  return data;
};