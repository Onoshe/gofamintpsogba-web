
const initStateCreateByUpload = {
    isDropped:false,
    isDragging:false,
    selected:{},
    uploadedData:[],
    resetFileUploadCount:0,
    file:"",
    infoMsg:{error:false, msg:''},
    table:{show:false, header:[], rowKeys:[], rows:[]},
    checkedBtn:'BYENTRY',
    checkedEditBtn:false,
};

function reducerCreateByUpload(state, action) {
    switch (action.type) {
      case 'setIsDropped': {
        return {...state, isDropped:action.payload};
      }
      case 'setIsDragging': {
        return {...state, isDragging:action.payload};
      }
      case 'setSelected': {
        return {...state, selected:action.payload};
      }
      case 'setUploadedData': {
        return {...state, uploadedData:action.payload};
      }
      case 'setResetFileUploadCount': {
        return {...state, resetFileUploadCount:action.payload};
      }
      case 'setFile': {
        return {...state, file:action.payload};
      }
      case 'setInfoMsg': {
        return {...state, infoMsg:action.payload};
      }
      case 'setCheckedBtn': {
        return {...state, checkedBtn:action.payload};
      }
      case 'setTable': {
        return {...state, table:action.payload};
      }
      case 'setToggleTable': {
        return {...state, table:{...state.table, show:action.payload}, file:"", infoMsg:{error:false, msg:''}};
      }
      case 'handleCancel': {
        return {...state, file:null, isDropped:false, isDragging:false, infoMsg:{msg:''}};
      }
      case 'setCheckedEditBtn': {
        return {...state, checkedEditBtn:action.payload};
      }
    
    }
    throw Error('Unknown action: ' + action.type);
  }



  export {reducerCreateByUpload, initStateCreateByUpload};