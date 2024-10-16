import { formatToCurrency } from "@/lib/currency";

const ReportTable = ({
    header=[], rows=[], rowKeys=[], pinRow, pinCol, style,
    clickableHeader, onClickHeader, clickableRow, onClickRow, clickableRowNo, onClickRowNo, clickableRowCellKeys,
    clickableRowCell, onClickRowCell,  classNameTable,  classNameHeaderTR, classNameRowsTR, windowDimen}) => {

      //clickableRowCellKeys - From IndexReport: {clickables} = getDisplayReport({})
      //clickableRowCell - From IndexReport: {clickables} = getDisplayReport({})
    const handleClickableCell =(row, i, key, id)=>{
        //console.log(row, i, key, id, clickableRowCellKeys)
        //Previous- if(clickableRowCell && clickableRowCellKeys?.includes(key)){
        if(clickableRowCellKeys?.includes(key)){
            onClickRowCell({key, row, i})
        }else if(clickableRowCellKeys === "ALL"){
            onClickRowCell({key, row, i})
        }
    }
    // table-pin-cols table-pin-rows
  return (
    <div className={classNameTable}
        data-theme="pastel" >
        <table className={`table table-xs table-zebra ${pinRow? 'table-pin-rows' :''} ${pinCol? 'table-pin-cols' :''}`}>
            <thead className="">
                <tr className={`${classNameHeaderTR}`}>
                    <td className={'py-4'}>{''}</td> 
                    {rowKeys?.map((key, i)=>{
                        const dt = header?.find((e)=> e.name === key);
                        return(
                            <td key={`${i}header`} 
                                className={`${dt?.className} whitespace-nowrap ${clickableHeader && 'cursor-default'}`} 
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
                        <tr key={`${i}td`} className={`${classNameRowsTR} ${row?.rowStyle}`}
                            style={{fontSize:'12px'}}>
                            <td className={``}>{i+1}</td>
                            {
                               rowKeys?.map((key, id)=>{
                                    const displayData = getDisplayData(row, key);
                                    return(
                                        <td key={`${id}key`}
                                            className={`${row.classNameTD} ${clickableRow && ''}`}  
                                            onClick={()=>{if(clickableRow){onClickRow(row)}}}>
                                            <span className={`${row[key+"ClassName"]}`} 
                                                onClick={()=>handleClickableCell(row, i, key, id)}>
                                                {displayData}
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

function getDisplayData(row, key){
   let data = "";
   const isAmount = parseFloat(row[key]);
   if(typeof row[key] == 'number'){
    data = formatToCurrency(row[key]);
   }else if(isAmount && ['amount', 'balance', 'debit', 'credit'].includes(key)){
    data = formatToCurrency(parseFloat(row[key]));
   }else{  data = row[key]}
  return data  
}

export default ReportTable;