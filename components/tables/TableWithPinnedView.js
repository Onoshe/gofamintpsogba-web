
const TableWithPinnedView = ({
    header=[], rows=[], rowKeys=[], pinRow, pinCol,
    clickableHeader, onClickHeader, clickableRow, onClickRow, clickableRowNo, onClickRowNo, clickableRowCellKeys,
    clickableRowCell, onClickRowCell, 
    classNameTable,  classNameHeaderTR, classNameRowsTR}) => {

      //  console.log(rowKeys)
    const handleClickableCell =(row, i, key, id)=>{
        //console.log(row, i, key, id, clickableRowCellKeys)
        if(clickableRowCell && clickableRowCellKeys?.includes(key)){
            onClickRowCell({key, row, i})
        }
    }
    // table-pin-cols table-pin-rows
  return (
    <div className={classNameTable}
        data-theme="pastel" >
        <table className={`table table-xs table-zebra ${pinRow? 'table-pin-rows' :''} ${pinCol? 'table-pin-cols' :''}`}>
            <thead>
                <tr className={`text-[12px] ${classNameHeaderTR}`}>
                    <td className={'py-5'}>{''}</td> 
                    {rowKeys?.map((key, i)=>{
                        const dt = header?.find((e)=> e.name === key);
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
                    //console.log(row)
                    return(
                        <tr key={`${i}td`} className={classNameRowsTR}
                            >
                            <td className={``}>{i+1}</td>
                            {
                               rowKeys?.map((key, id)=>{
                                    return(
                                        <td key={`${id}key`} className={`${row.classNameTD} ${clickableRow && ''}`}  
                                            onClick={()=>{if(clickableRow){onClickRow(row)}}}>
                                            <span className={`${row[key+"ClassName"]} text-[11px]`} 
                                                onClick={()=>handleClickableCell(row, i, key, id)}>{row[key]}
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

export default TableWithPinnedView