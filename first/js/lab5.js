"use strict";
const promise = new Promise((resolve, reject) => {
    let data = getJson();

    if (data !== null && data !== undefined) {
        resolve(data); //если в файле что то есть, то все ок
    } else {
        reject(new Error('Что-то пошло не так'));
    }
});

function readData() {
    promise
        .then((data) => {
            console.log(data);  // вывести 'Все прошло отлично!'
            return data;
        })
        .then((obj) => {
            let today = Date.parse("2020-12-13");
            let labs = [];
            for(let discipline in obj.disciplines) {
                obj.disciplines[discipline].map(f => {
                    if (Date.parse(f.date) < today && f.mark === -1) labs.push(f);
                })
            }
            let res = document.getElementById("result-block");
            let h1 = document.createElement("h1");
            h1.innerHTML = "FIO: " + obj.fio +
                "<br/>Faculty: " + obj.faculty +
                "<br/>Speciality: " + obj.speciality;
            res.appendChild(h1);
            return labs;
        })
        .then((labs) => {
            let res = document.getElementById("result-block");
            labs.map(lab => {
                let h1 = document.createElement("h1");
                h1.innerHTML = "Name: " + lab.name + "&nbsp Date: " + lab.date + "&nbsp Mark: " + lab.mark;
                res.appendChild(h1);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function getJson() {
    return fetch("./data.json") //получаем информацию из файла
        .then(function (resp) {
            return resp.json(); //возвращаем ее в виде объекта
        });
}
