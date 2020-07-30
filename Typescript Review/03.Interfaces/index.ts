//Iniciar un proyecto Typescript: tsc --init
//Interfaces
interface IAnimal 
{
    name: string;
    color: string;
}

const dog: IAnimal = 
{
    name: "Maxwell",
    color: "Gray"
};

interface OnInit
{
    ngOnInit(): void;
}

class MyComponent implements OnInit
{
    ngOnInit(): void {
        console.log('OnInit Interface');
    }
}

const component: MyComponent = new MyComponent();
component.ngOnInit();