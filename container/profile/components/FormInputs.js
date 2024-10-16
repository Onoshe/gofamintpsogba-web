
const TextInput=({title,subTitle, placeholder, type, value, onClick, isRequired,readOnly,
    onChange, required, name, autoComplete, titleColor, contStyle, inputStyle})=>{
    
    return(
        <div className={`${contStyle} text-[14px]`}>
            <label className={`pl-2 ${titleColor? titleColor : 'text-[teal]'}`}
                >
                {title} <span className='text-[red]'>{required? '*' : ''}</span>
                <span className='text-gray-500 '>{subTitle}</span>
            </label>
            <input className={`${styles.input_base} ${inputStyle} mt-0`}
                 type={type? type : "text"} 
                 placeholder={placeholder}
                 value={value}
                 onChange={onChange}
                 onClick={onClick}
                 required= {required || ""}
                 name={name}
                 readOnly={readOnly}
                 autoComplete={autoComplete || ""} 
                />
        </div>
    );
}


const styles ={
    input_base:`block w-full 
        px-3 
        border-b border-solid border-gray-400
        focus:text-gray-700 focus:bg-white focus:border-blue-600 
        focus:outline-none`,

}
export {TextInput}