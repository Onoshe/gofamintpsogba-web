import { formatToCurrency } from "@/lib/currency";

const PersonalAccountsReportTable = ({
    header=[], rows=[], rowKeys=[], pinRow, pinCol, style,
    clickableHeader, onClickHeader, clickableRow, onClickRow, clickableRowNo, onClickRowNo, clickableRowCellKeys,
    clickableRowCell, onClickRowCell,  classNameTable,  classNameHeaderTR, classNameRowsTR,clickedHeader,setClickedHeader, windowDimen}) => {


    const handleClickableCell =(row, i, key, id)=>{
        if(clickableRowCellKeys?.includes(key)){
            onClickRowCell({key, row, i})
        }else if(clickableRowCellKeys === "ALL"){
            onClickRowCell({key, row, i})
        }
    }
    const sortArrow = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="inline-flex" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>;
     const clearSort = <svg onClick={()=>setClickedHeader({...clickedHeader, name:'', title:''})} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="maroon" className="inline-flex" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>;
    // table-pin-cols table-pin-rows
  return (
    <div className={classNameTable}
        data-theme="pastel" >
        <table className={`table table-xs table-zebra ${pinRow? 'table-pin-rows' :''} ${pinCol? 'table-pin-cols' :''}`}>
            <thead className="">
                <tr className={`${classNameHeaderTR}`}>
                    <td className={`${clickableHeader && clickedHeader.name? 'cursor-pointer py-3' : 'py-4'}`}>{clickableHeader && clickedHeader.name? clearSort : ''}</td> 
                    {rowKeys?.map((key, i)=>{
                        const dt = header?.find((e)=> e.name === key);
                        let showSortArr = false;
                        if(clickedHeader.name === key){
                            showSortArr = true;
                        }
                        return(
                            <td key={`${i}header`} 
                                className={`${dt?.className} whitespace-nowrap ${clickableHeader? 'cursor-pointer' : ''}`} 
                                onClick={()=>{if(clickableHeader){onClickHeader(dt)}}}>
                                {clickableHeader && showSortArr && sortArrow}
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

export default PersonalAccountsReportTable;