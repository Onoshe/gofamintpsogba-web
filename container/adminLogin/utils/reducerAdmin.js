var defMessage = `
  <p>I hope this email finds you well.</p><p>Please find attached your latest account statement for your review. If you have any questions or need further clarification about your account or the details in the statement, please don't hesitate to contact us.</p>
  <p>We sincerely appreciate your continued support and trust in our services.</p>
`;

export const initialState = {
    emailContent:{holder:'', title:'', body:'', email:'', senderTeam:'Mangement'},
    closeSidebar: true,
    emailResponse:{style:'', msg:''},
    content: defMessage,
    showPreview:false,
    sendingMail:false,
    file:{},
};

function reducerAdmin(state, action){
    switch (action.type) {
        case 'setEmailContent':
            return {...state, emailContent:action.payload};
        case 'setShowPreview':
            return {...state, showPreview:false};
        case 'handleChangeUpload':
                return {...state, file:false};
        case 'handleEditorChange':
               return {...state, content:action.payload, emailContent:{
                ...state.emailContent, body:action.payload, 
                emailResponse:{style:'', msg:''}}
              };
        case 'handleEmailContent':
            const {name, value} = action.payload.target;
                return {...state, emailContent:{...state.emailContent, [name]:value}, 
                emailResponse:{style:'', msg:''}};
        default:
            break;
    }
}

export default reducerAdmin
