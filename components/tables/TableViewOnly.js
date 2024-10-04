
const TableViewOnly = ({
    headers=[], rows=[], rowKeys=[], styleCont,  styleHeader, styleHeaderTd, styleBody, styleBodyTr}) => {

    
  return (
    <div className={`overflow-x-auto ${styleCont}`}
        data-theme="pastel" >
        <table className="table table-xs table-zebra">
            <thead className={styleHeader}>
                <tr> 
                    <td  className={styleHeaderTd}>
                        {'SN'}
                    </td>
                    {headers?.map((dt, i)=>{
                        return(
                            <td key={`${i}header`} className={``}>
                                {dt}
                            </td>
                        )
                    })}
                </tr>
            </thead> 
            <tbody className={styleBody}>
                {rows?.map((row, i)=>{
                    return(
                        <tr key={`${i}td`}>
                            <td className={styleBodyTr}>
                                {i+1}
                            </td>
                            {
                               rowKeys?.map((key, id)=>{
                                    return(
                                        <td key={`${id}key`} className={``}>
                                            <span className={``}>
                                                {row[key]}
                                            </span>
                                        </td>
                                    )
                               }) 
                            }
                        </tr>
                    )
                })}
            </tbody> 
        </table>
    </div>
  )
}

export default TableViewOnly