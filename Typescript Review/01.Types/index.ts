//Types
//Typescript no da error si no se le indica el tipo, dado que es Javascript.
const framework: string = "Angular";
const isProduction: boolean = true;
const PORT: number = 3000;
const styles: Array<string> = ["a", "b"];

const sayHello: Function = (name: string): string =>{return `Hello ${name}`};
console.log(sayHello("Renato Coronado"));
