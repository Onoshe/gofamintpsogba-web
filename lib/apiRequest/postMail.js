
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;



export const postMail = async (url, postData) => {
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