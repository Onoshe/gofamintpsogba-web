

const authToken = process.env.NEXT_PUBLIC_DBTOKEN;

export const patchRequest = async (url, patchData) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(patchData)
  });

  const data = await response.json();
  return data;
};