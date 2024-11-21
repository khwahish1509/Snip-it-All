function flattenArray(arr){
    return arr.flat(Infinity)
}

//usage:-
const nested = [1, [2, [3, [4,5]]]];
console.log(flattenArray(nested));//[1,2,3,4,5]