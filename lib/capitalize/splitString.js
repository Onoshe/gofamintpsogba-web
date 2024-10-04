export function splitByFirstChar(str, char){
    const splitChar = char || '=';
    const [firstPart, ...rest] = str.split(splitChar); // split by 
    const result = [firstPart, rest.join(splitChar)]; // combine the rest if there are multiple parts
    return  result
}
