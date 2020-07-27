//Importamos el móduclo creado
//const Emitter = require("./emitter");
const library = require("events");
const names = require("./event-names");

const emitter = new library.EventEmitter();

emitter.on(names.SAVED, ()=>
{
    console.log("On save activated!");
});

emitter.on(names.SAVED, ()=>
{
    console.log("On save 2 activated!");
});

emitter.emit(names.SAVED);

