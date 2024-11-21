//Safely clone complex objects to avoid reference issues.

function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}

//usage:-
const original = {a: 1, b: {c: 2}};
const clone = deepClone(original);
clone.b.c = 42;