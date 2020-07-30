//Functions in TypeScript

function sum(a: number, b: number): number
{
    return a + b;
}

function mathOperation(callback: Function, a: number, b: number): number
{
    return callback(a,b);
}

const result: number = mathOperation(sum, 5,6);
console.log(result);