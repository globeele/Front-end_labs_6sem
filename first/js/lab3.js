function task3_2() {
    let app = new NumbGenerator(1000, 100);
    let resArray = app.generate(100);
    let result = document.getElementById("result-block");
    result.innerHTML = "";
    let p = document.createElement("h2");
    p.innerText = String("Result array: " + resArray.slice(0, 20));
    result.appendChild(p);
    //result.appendChild(createElement("h2", String("Result array: " + resArray.slice(0, 20))));
}

function task3_4() {
    let names = ["Nastya", "Nikita", "Petya", "Andrey", "Alexey", "Jenya"];
    let users = [];
    let result = document.getElementById("result-block");
    result.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        let app = new Human(names);
        users.push(app);
    }
    users.sort((a, b) => a.age - b.age);

    users.forEach(f => {
        let p = document.createElement("h2");
        p.innerText = f.sayHello();
        result.appendChild(p);
    });

}

/**
 * Get random value in array.
 * @param arr - source array
 * @returns {*}
 */
function random(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

/**
 * Get random value by range
 * @param min - left range
 * @param max - right range
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tagAppend(tag, data) {
    tag.appendChild(createElement("h2", data));
}



function createElement(elemName, text) {
    let elem = document.createElement(elemName);
    elem.innerText = text;

    return elem;
}

const NumbGenerator = function(s, p) {
    let range = s / 100 * p;
    this.minRange = Number(s - range);
    this.maxRange = Number(s + range);
};

NumbGenerator.prototype.generate = function(count) {
    let set = new Set;
    if (count !== undefined) {
        for (let i = 0; i < count; i++) {
            set.add(getRandomInt(this.minRange, this.maxRange));
        }
    }
    return [... set].sort((a, b) => a - b);
};

const Human = function(names) {
    this.name = random(names);
    this.age = getRandomInt(10, 50);
};

Human.prototype.sayHello = function () {
    return 'Hello: ' + this.name + ' ' + this.age + '\n';
};

