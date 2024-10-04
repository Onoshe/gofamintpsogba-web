//const AUTHPASS = process.env.COUNTIXPRESS_PHPSERVER_PASS;
const authToken =  "COUNTIXPRESSSERVER_PASS";


export const backUpDb = async (url, backupPass) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(backupPass)
  });

  const data = await response.json();
  return data;
};