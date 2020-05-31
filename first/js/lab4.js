class Figure {
    constructor(x1, y1, x2, y2 , name, parameter) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.name = name;
        this.parameter = parameter;
        this.getSize();
    }

    getSize() {
        this.size = Math.sqrt( Math.pow((this.x2 - this.x1), 2) + Math.pow((this.y2 - this.y1), 2));
    }

    getInfo() {
        return `${this.parameter} ${this.name} = ${this.size}.`;
    }
}

class Square extends Figure {

    constructor(x1, y1, x2, y2 , name, parameter) {
        super(x1, y1, x2, y2 , name, parameter); //вызов конструктора класса фигура и передача параметров
    }

    getPerimetr() {
        return this.size * 4;
    }

    getSquare() {
        return this.size * this.size;
    }
}

class Circle extends Figure {
    constructor(x1, y1, x2, y2 , name, parameter) {
        super(x1, y1, x2, y2 , name, parameter);
    }

    getPerimetr() {
        return 2 * Math.PI * this.size;
    }

    getSquare() {
        return Math.PI * this.size * this.size;
    }
}

class Treangle extends Figure {
    constructor(x1, y1, x2, y2 , name, parameter) {
        super(x1, y1, x2, y2 , name, parameter);
    }

    getPerimetr() {
        return this.size * 3;
    }

    getSquare() {
        return this.size * this.size * Math.sqrt(3) / 4;
    }
}

var figure;


function outputPerimetr() {
    initializationObject();
    document.getElementById("resultSize").innerText = "";
    document.getElementById("resultSize").innerText = "Периметр " + figure.name + " = " + figure.getPerimetr();
}

function outputSquare() {
    initializationObject();
    document.getElementById("resultSize").innerText = "";
    document.getElementById("resultSize").innerText = "Площадь " + figure.name + " = " + figure.getSquare();
}

function outputSize() {
    initializationObject();
    document.getElementById("resultSize").innerText = "";
    document.getElementById("resultSize").innerText = figure.getInfo();
}



function initializationObject() {
    var x1 = document.getElementById("x1").value;
    var x2 = document.getElementById("x2").value;
    var y1 = document.getElementById("y1").value;
    var y2 = document.getElementById("y2").value;

    if(document.getElementById("square").checked) {
        figure = new Square(x1, y1, x2, y2, "квадрата", "Сторона");
        console.log("q")
    }
    if(document.getElementById("circle").checked) {
        figure = new Circle(x1, y1, x2, y2, "круга", "Радиус");
        console.log("c")

    }
    if(document.getElementById("triangle").checked) {
        figure = new Treangle(x1, y1, x2, y2, "треугольника", "Сторона");
        console.log("t")

    }
}