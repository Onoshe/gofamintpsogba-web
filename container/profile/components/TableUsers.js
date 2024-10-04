
const TableUsers = ({
    header=[], rows=[], rowKeys=[], clickableHeader, onClickHeader, clickableRow, onClickRow, clickableRowCellKeys,
    clickableRowCell, onClickRowCell, classNameTable,  classNameHeaderTR, classNameRowsTR}) => {

    const handleClickableCell =(row, i, key, id)=>{
        //console.log(row, i, key, id, clickableRowCellKeys)
        if(clickableRowCell && clickableRowCellKeys?.includes(key)){
            onClickRowCell({key, row, i})
        }
    }
  return (
    <div className={`overflow-x-auto ${classNameTable}`}
        data-theme="pastel" >
        <table className="table table-xs table-zebra">
            <thead>
                <tr className={classNameHeaderTR}> 
                    <td  className={`${''}`}>
                        {'SN'}
                    </td>
                    {header?.map((dt, i)=>{
                        return(
                            <td key={`${i}header`} className={`${dt?.className} ${clickableHeader && 'cursor-default'}`} 
                                onClick={()=>{if(clickableHeader){onClickHeader(dt)}}}>
                                {dt?.title}
                            </td>
                        )
                    })}
                </tr>
            </thead> 
            <tbody>
                {rows?.map((row, i)=>{
                    return(
                        <tr key={`${i}td`} className={classNameRowsTR}>
                            <td className={`${''} `}>
                                {i+1}
                            </td>
                            {
                               rowKeys?.map((key, id)=>{
                                    return(
                                        <td key={`${id}key`} className={`${row.classNameTD} ${clickableRow && 'cursor-default'}`} onClick={()=>{if(clickableRow){onClickRow(row)}}}>
                                            <span className={`${row[key+"ClassName"]}`} 
                                                onClick={()=>handleClickableCell(row, i, key, id)}>{row[key]}</span>
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

export default TableUsers