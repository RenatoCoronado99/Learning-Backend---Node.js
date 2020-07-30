const server = require('./server');
const {PORT} = require('./config');

server.listen(PORT, ()=>
{
    console.log(`CodingApp backend running on port ${PORT}`);
});