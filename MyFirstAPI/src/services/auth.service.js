const { JwtHelper } = require('../helpers');
let _userService = null;
class AuthService
{
    constructor({ UserService })
    {
        _userService = UserService;
    }

    async signUp(user)
    {
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist)
        {
            const error = new Error();
            error.status = 400;
            error.message = "User already exist";
            throw error;
        }
        return await _userService.create(user);
    }

    async signIn(user)
    {
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);
        if(!userExist)
        {
            const error = new Error();
            error.status = 404;
            error.message = "User doesn't exist";
            throw error;
        }
        const validPassword = userExist.comparePassword(password);
        if(!validPassword)
        {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid password";
            throw error;
        }
        //Creamos un objeto para encriptar el token de sesión
        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };
        //Va a generar el token con el usuario que le estamos pasando.
        const token = JwtHelper.generateToken(userToEncode);
        return {token, user: userExist};
    }
}

module.exports = AuthService;