import { taskFields } from "./interfaces";

//replace obj with same id in array
export const replaceArray = (array:taskFields[],obj:taskFields,action:string) => {
    const tempArray = array.map(e => {return {...e}});
    const previousId = tempArray.findIndex(e => e.id === obj.id);
    if (previousId !== -1) {
        action ? tempArray.splice(previousId,1) : tempArray.splice(previousId,1,obj);
    } 
    return tempArray;
}