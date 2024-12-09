
export const Header1 =({style, text})=>{
    
    return(
        <p className={`text-3xl pb-4 pt-7 font-[500] text-[#223657] ${style}`}>
            {text}
        </p>
    )
}

export const Text1 =({style, text})=>{
    
    return(
        <p className={`text-gray-800 text-md inline-flex ${style}`}>
            {text}
        </p>
    )
}

export const Span =({style, text})=>{
    
    return(
        <p className={`font-bold ${style}`}>
            {text}
        </p>
    )
}