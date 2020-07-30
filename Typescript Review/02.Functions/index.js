"use strict";
//Functions in TypeScript
function sum(a, b) {
    return a + b;
}
function mathOperation(callback, a, b) {
    return callback(a, b);
}
var result = mathOperation(sum, 5, 6);
console.log(result);
