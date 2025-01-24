var arr = [1,1,2,3,2,4,5,3,4,4,5,1,1,2,5,4,3];

function groupSameElements(arr){
   const grouped = arr.reduce((r,v,i,a)=>{
    if(v===a[i-1]){
        r[r.length-1].push(v);
    }else{
        r.push(v===a[i+1]? [v] : v);
    }
    return r;
   },[]); 
   return grouped
}



    const groupArrOfObjToObj = (items, key) => items.reduce(
        (result, item)=>({
            ...result,
            [item[key]]: [
                ...(result[item[key]] || []),
                item,
            ],
        }),
        {},
    );

    function groupArrOfObjsToArrOfObjs(arrs, key){
        // arrs=>[[{},{},{}],[{}], [{},{}],...]- each array is family data: 
        const grouped = []; 
        for(var i = 0; i < arrs.length; i++ ){
           const family = arrs[i];
           let parents = [], children=[];
           for(var j=0; j<family.length; j++){
            const famMember = family[j];
            if(famMember[key] === "parent" || famMember[key] === "adult" || famMember[key] === "user"){
              parents.push(famMember)
            }else{children.push(famMember)}
           }
           grouped.push({parents, children});
        }
        //grouped =>[{parents:[], children:[]}, {parents:[], children:[]}...]
        return grouped
    }
    function groupArrOfObjToArr(arrs, prop){
        //arrs => [{surname:"", famStat:"", dob:""....}, {surname:"", famStat:"", dob:""....}...]
        const grouped = [];
        for(var i = 0; i < arrs.length; i++ ){
            const item = arrs[i]; 
            if(i===0){
                grouped.push([item])
            }else{
                const lstgroupedItem = grouped[grouped.length-1];
                const prevIndx = i-1, prevArrs = arrs[prevIndx] ;
                if(item[prop] === prevArrs[prop]){
                    lstgroupedItem.push(item)
                }else{
                    grouped.push([item])
                }
            }
        }
        //groped =>each arr is family data: [[{},{},{}],[{}], [{},{}],...]
        return grouped
    }


    function groupByObj(objArr, prop){
     return objArr.reduce(function (result, obj){
            var key = obj[prop];
            if(!result[key]){
                result[key] =[];
            }
            result[key].push(obj);
            return result;
        },{});
    }

    function groupByObjArrs(objArr=objs, prop="fam"){
        return objArr.reduce(function (result, obj){
               var key = obj[prop];
               if(!result[key]){
                   result[key] =[];
               }
               result[key].push(obj);
               return result;
           },{});
       }


const groupArrOfObjArrToObj = (items, key) => items.reduce(
    (result, item)=>({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);
function groupArrOfObjArrToArr(arrs, prop){
    const grouped = [];
    for(var i = 0; i < arrs.length; i++ ){
       const res = groupArrOfObjArrToObj(arrs[i], prop);
       grouped.push(res)
    }
    console.log(grouped)
    return grouped
}
const objs = [
    {sn:1, name: 'James', dob: 'Jun 2000', fam:'James'}, 
    {sn:2, name: 'Abiodun', dob: 'Dec 2005',fam:'James'}, 
    {sn:3, name: 'Mary', dob: 'Jul 1900', fam:'Mary'},
    {sn:4, name: 'Joy', dob: 'May 2020',fam:'Mary'}, 
    {sn:5, name: 'Kemi', dob: 'Sep 2020', fam:'Mary'}, 
    {sn:5, name: 'Kelly', dob: 'Aug 2021', fam:'Kelly'}]




    export {groupArrOfObjToObj, groupArrOfObjToArr, groupArrOfObjsToArrOfObjs}