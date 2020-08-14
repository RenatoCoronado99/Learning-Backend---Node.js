const express = require('express');
const app = express();

const response = 
{
    data: [],
    services: "Car Service",
    architecure: "Microservices"
};

app.use((req, res, next)=>
{
    response.data = [];
    next();
});

const logger = message => {console.log(`[Car Service ] ${message}`);};

app.get("/api/v2/cars", (req, res)=>
{
    respomse.data.push(
        "Toyota Corolla 1997",
        "Hyundai Tucson 2014"
    );
    logger("Get car data");
    return res.send(response);
})

module.exports = app;