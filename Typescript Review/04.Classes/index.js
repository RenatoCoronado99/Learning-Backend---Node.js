"use strict";
var Pizza = /** @class */ (function () {
    function Pizza() {
        this.tomatoe = false;
        this.cheese = "";
        this.bacon = false;
        this.otherIngredients = [];
    }
    Pizza.prototype.setTomatoe = function () {
        this.tomatoe = !this.tomatoe;
        return this;
    };
    Pizza.prototype.setCheese = function (cheese) {
        this.cheese = cheese;
        return this;
    };
    Pizza.prototype.setBacon = function () {
        this.bacon = !this.bacon;
        return this;
    };
    Pizza.prototype.setOtherIngredients = function (ingredients) {
        this.otherIngredients = ingredients;
        return this;
    };
    Pizza.prototype.build = function () {
        return this;
    };
    return Pizza;
}());
var pepperoniPizza = new Pizza();
pepperoniPizza.setBacon().setCheese("Mozzarella").setTomatoe().setOtherIngredients(["Pepperoni", "Sausage"]).build();
console.log(pepperoniPizza);
