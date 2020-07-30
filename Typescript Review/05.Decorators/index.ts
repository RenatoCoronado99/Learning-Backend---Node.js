//Decorador: función que ejecuta una lógica en una clase, propiedad u otra función.

function SelfDriving(consturctorFunctions: Function)
{
    consturctorFunctions.prototype.selfDriving = true;
}

function Wheels(numberOfWheels: number): Function
{
    return function(constructor: Function)
    {
        constructor.prototype.wheels = numberOfWheels;
    }
}

@SelfDriving
@Wheels(4)
class Car
{
    private brand: string;
    constructor(brand: string)
    {
        this.brand = brand;
    }
}

const nissan: Car = new Car("Nissan");
console.log(nissan.wheels);
