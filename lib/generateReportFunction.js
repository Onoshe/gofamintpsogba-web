import {groupArrOfObjsToArrOfObjs, groupArrOfObjToArr} from './groupArrElements';
import sortArray from './sortData';

function generateReportFunction(data, prop1, prop2, prop3){
    //i. Sort the data by Family, ii. group to Fam array iii. Group fam array to parent/children
    //Return: [{parents:[], children:[]}, {parents:[], children:[]}...]
    //console.log([data, prop1, prop2,prop3])
    let result = [{parents:[], children:[]}];

    if(data.length <= 1){
        result = [{parents:data, children:[]}];
    }else{
        const sortByFam = sortArray(data, prop1);
      const arrsOfFam = groupArrOfObjToArr(sortByFam, prop2);
      result = groupArrOfObjsToArrOfObjs(arrsOfFam, prop3);
    }

    return result;
}

export default generateReportFunction;