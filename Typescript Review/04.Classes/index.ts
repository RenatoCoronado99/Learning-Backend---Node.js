class Pizza
{
    public tomatoe: boolean = false;
    public cheese: string = "";
    public bacon: boolean = false;
    public otherIngredients: Array<string> = [];

    setTomatoe(): Pizza
    {
        this.tomatoe = !this.tomatoe;
        return this;
    }

    setCheese(cheese: string): Pizza
    {
        this.cheese = cheese;
        return this;
    }

    setBacon(): Pizza
    {
        this.bacon = !this.bacon;
        return this;
    }

    setOtherIngredients(ingredients: string[]): Pizza
    {
        this.otherIngredients = ingredients;
        return this;
    }

    build()
    {
        return this;
    }
}

const pepperoniPizza: Pizza = new Pizza();
pepperoniPizza.setBacon().setCheese("Mozzarella").setTomatoe().setOtherIngredients(["Pepperoni", "Sausage"]).build();
console.log(pepperoniPizza);