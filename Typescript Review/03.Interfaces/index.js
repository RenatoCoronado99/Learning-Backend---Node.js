"use strict";
var dog = {
    name: "Maxwell",
    color: "Gray"
};
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.prototype.ngOnInit = function () {
        console.log('OnInit Interface');
    };
    return MyComponent;
}());
var component = new MyComponent();
component.ngOnInit();
