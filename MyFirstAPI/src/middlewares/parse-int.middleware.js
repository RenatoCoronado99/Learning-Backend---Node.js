module.exports = function(req, res, next)
{
    //Recupera todos los query strings enviados
    const queryStrings = req.query;
    for(const key in queryStrings)
    {
        const length = queryStrings[key].length;
        const isValid = length > 20 ? false : !isNaN(queryStrings[key]);
        if(isValid)
        {
            queryStrings[key] = parseInt(queryStrings[key]);
        }
    }
    req.query = queryStrings;
    next(); //L da acceso al próximo middleware de express(en caso haya).
};