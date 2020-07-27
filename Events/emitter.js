//Se simulará un emisor de eventos
function Emitter()
{
    this.events = {};
}

//type: tipo de evento, y el listener responde al evento.
Emitter.prototype.on = function(type, listener)
{
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}

//función que emite el evento
Emitter.prototype.emit = function(type)
{
    if(this.events[type])
    {
        this.events[type].forEach((listener) => listener() );
    }
}

module.exports = Emitter;