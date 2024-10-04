
const authToken = process.env.NEXT_PUBLIC_DBTOKEN;



export const deleteRequest = async (url, deleteQuery) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(deleteQuery)
  });

  const data = await response.json();
  return data
};