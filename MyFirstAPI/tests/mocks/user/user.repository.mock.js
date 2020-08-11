//Exportaremos el mock de las funciones
module.exports = 
{
    get: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getUserByUsername: jest.fn()
};