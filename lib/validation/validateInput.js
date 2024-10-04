
const validateInputs =({type, form, test})=>{
    let res = {error:false};

    switch (type) {
        case "FIELDVALUE":
            const {reqFields} = test;
            for (let index = 0; index < reqFields.length; index++) {
                const el = reqFields[index];
                const inValid = !form[el] || form[el] === null || form[el] === "" || form[el] === undefined;
                if(inValid) return {...res, error:true, field:el}
            }
            break;
    
        case "VALUEEXIST":
            const {key, value} = test;
            for (let index = 0; index < form.length; index++) {
                const obj = form[index];
                const valueExist = obj[key] === value;
                if(valueExist) return {...res, error:true}
            }
            break;
    
        default:
            break;
    }
    
    return res;
}



export {validateInputs}