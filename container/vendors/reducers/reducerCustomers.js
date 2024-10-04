
const initStateCustomers = {
    isDropped:false,
   
};



function reducerCustomers(state, action) {
    switch (action.type) {
      case 'setIsDropped': {
        return {...state, isDropped:action.payload};
      }
    
    }
    throw Error('Unknown action: ' + action.type);
  }



  export {reducerCustomers, initStateCustomers};