
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;

export const putRequest = async (url, putQuery) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(putQuery)
  });

  const data = await response.json();
  return data;
};