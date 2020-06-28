class Figure {
    constructor(a , name, parameter) {
        this.a = a;
        this.name = name;
        this.parameter = parameter;
    }
}

class Square extends Figure {

    constructor(a, name, parameter) {
        super(a, name, parameter); //вызов конструктора класса фигура и передача параметров
    }

    getSquare() {
        return this.a * this.a;
    }
}

class Circle extends Figure {
    constructor(a , name, parameter) {
        super(a, name, parameter);
    }

    getSquare() {
        return Math.PI * this.a * this.a;
    }
}

class Treangle extends Figure {
    constructor(a, name, parameter) {
        super(a, name, parameter);
    }

    getSquare() {
        return this.a * this.a * Math.sqrt(3) / 4;
    }
}

var figure;




function outputSquare() {
    initializationObject();
    document.getElementById("resultSize").innerText = "Площадь " + figure.name + " = " + figure.getSquare();
}
function initializationObject() {
    var a = document.getElementById("a").value;

    if(document.getElementById("square").checked) {
        figure = new Square(a, "квадрата", "Сторона");
        console.log("q")
    }
    if(document.getElementById("circle").checked) {
        figure = new Circle(a, "круга", "Радиус");
        console.log("c")

    }
    if(document.getElementById("triangle").checked) {
        figure = new Treangle(a, "треугольника", "Сторона");
        console.log("t")

    }
}