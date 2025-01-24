

const encodeDecodeServerSide = (stringToEncode, type) => {
    let data = "";
    try {
        data = type === 'ENCODE'? Buffer.from(stringToEncode).toString('base64') : 
                                  Buffer.from(stringToEncode, 'base64').toString('utf-8');
      } catch (e) {
        console.error(e.message);
      }
    return data
};



export default encodeDecodeServerSide