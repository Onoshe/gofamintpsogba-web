export const Text = ({v, s})=>{
    return(<p className={`font-bold ${s}`}>{v}</p>)
}

export const TextCont = ({v, t, s1, s2})=>{
    return(
        <div className="flex flex-col">
            <p className={`${s1}`}>{t}</p>
            <p className={`border bg-white border-gray-500 py-1 px-1 h-fit rounded-md ${s2}`}>{v}</p>
        </div>
    )
}

//Text Span Styled
export const TextSS = ({v,s})=>{
    return(<span className={`text-blue-700 font-bold ${s}`}>{v}</span>)
}

//Text Span Border
export const TextSB = ({v,s})=>{
    return(<span className={`border border-gray-500 py-1 px-1 rounded-md ${s}`}>{v}</span>)
}
//Text Span Emphasis
export const TextSE = ({v})=>{
    return(<span className='shadow-md py-[1px] px-1 bg-blue-50'>{v}</span>)
}
//Text Paragraph
export const TextP = ({v, s})=>{
    return(<p className={`${s}`}>{v}</p>)
}
//Text Paragraph Border
export const TextPB = ({v,s})=>{
    return(<p className={`border border-gray-500 py-1 px-1 h-fit rounded-md ${s}`}>{v}</p>)
}


export const TextAreaPB = ({v,s})=>{
    return(<p className={`border border-gray-500 py-1 px-1 rounded-md h-16 max-w-[150px] ${s}`}>{v}</p>)
}
