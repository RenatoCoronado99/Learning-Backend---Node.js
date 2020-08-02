const mongoose = require("mongoose");
const { Schema } = mongoose;
//Métodos que encriptarán las contraseñas de los usuarios:
//compareSync: comparar contraseñas una vez encriptadas, para saber si la que se introdujo es igual a la encriptada.
//HashSync: crear un hash a la contraseña.
//genSaltSync: generar un Salt.
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//Mongoose utliza y llama cada vez que se hace una lectura, se modifica de manera que cada vez que se lea un usuario no traiga la contraseña del mismo.
userSchema.methods.toJSON = function()
{
    //Nos convierte el JSON que retorna en un objeto:
    let user = this.toObject();
    delete user.password;
    return user;
};

//Método que compara contraeeñas una vez encriptadas:
userSchema.methods.comparePassword = function(password)
{
    return compareSync(password, this.password);
};

//Función que se ejecuta antes de ser guardada.
userSchema.pre('save', async function(next)
{
    const user = this;
    if(!user.isModified("password"))
    {
        //Si no se está modificando la contraseña, procedemos a avanzar con la función next():
        return next();
    }
    //Si se está modificando, se genera un Salt:
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model("user", userSchema);
