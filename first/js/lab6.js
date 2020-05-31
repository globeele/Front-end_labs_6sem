const gstu = { //хранит методы
    selectStudents: function () {
        fetch('/user/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }).then(function (resp) {
            return resp.json();
        }).then(objects => {
            let o = JSON.parse(objects);
            let stb = document.getElementById("students-block");
            stb.appendChild(generateTableStructure("students-table", o)); //формирует таблицу на основе полученных данных
        })
    },
    deleteStudent: async function(id) {
        const url = '/user/del';
        const data = { id: id };

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    },
    createStudent: async function(data) {
        const url = '/user/create';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    },

    updateStudent: async function(data) {
        const url = '/user/update';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    },
    specialities: ["IT", "IE", "GI"]
};

const controller = {
    create: function () {
        let name = document.getElementById("text-name").value;
        let surname = document.getElementById("text-surname").value;
        let spec = document.getElementById("specialities").value;
        let data = {
            name: name,
            surname: surname,
            speciality: spec
        };
        gstu.createStudent(data).then(r => {

                let tbody = document.getElementById("main-tbody");
                tbody.appendChild(createRow(JSON.parse(r)));
        });
    },
    update: function (index) {
        let row = document.getElementById("row-" + index);
        let data = [index];
        for (let cell of row.cells) {
            if (cell.children[0].type === "text") {
                data.push(cell.children[0].value);
            }
        }
        gstu.updateStudent(data).then(r => console.log('Успех:', JSON.stringify(r)));
        /*
        document.getElementById("text-name").value = elem.name;
        document.getElementById("text-surname").value = elem.surname;
        document.getElementById("specialities").value = elem.speciality;*/
    },
    delete: function (id) {
        if (id > 0) {
            gstu.deleteStudent(id).then(r => console.log('Успех:', JSON.stringify(r)));
            gstu.selectStudents();
        }
    }
};

function createHeader(tbody, titleCollection) {
    let header = document.createElement("tr");
    titleCollection.forEach(title => {
        let th = document.createElement("th");
        th.innerHTML = title;
        header.appendChild(th)
    });
    tbody.appendChild(header);
}

function generateTableStructure(tableId, collection) {
    isTableExists(tableId);

    let table = document.createElement("table");
    table.id = tableId;
    table.className = "table_dark";
    let tbody = document.createElement("tbody");
    tbody.id = "main-tbody";

    createHeader(tbody, ["name", "surname", "speciality", "status"]);

    collection.forEach(f => {
        tbody.appendChild(createRow(f, f.id));
    });
    table.appendChild(tbody);

    return table;
}

function createRow(element, index) {
    let row = document.createElement("tr");
    row.id = "row-" + index;

    for (let i = 0; i < 6; i++) {
        row.appendChild(createTd(element, i, index));
    }
    return row;
}

function createTd(element, col, index) {
    let td = document.createElement("td");

    switch (col) {
        case 0: td.appendChild(createElement("input", "text", element.name)); break;
        case 1: td.appendChild(createElement("input", "text", element.surname)); break;
        case 2: td.appendChild(createElement("input", "text", element.speciality)); break;
        case 3:
            let cb = createElement("input", "checkbox", element.speciality);
            cb.checked = element.isActive;
            cb.disabled = true;
            td.appendChild(cb); break;
        case 4: td.appendChild(createBtn("Delete", controller.delete, index)); break;
        case 5: td.appendChild(createBtn("Update", controller.update, index)); break;
    }

    return td;
}

function createElement(elementName, type, val) {
    let elem = document.createElement(elementName);
    elem.value = val;
    elem.type = type;

    return elem;
}

function createSelectObject(className, tr) {
    let td = document.createElement("td");
    let select = document.createElement("select");
    select.id = className;

    for (let i = 0; i < gstu.specialities.length; i++) {
        select.options[i] = new Option(gstu.specialities[i], gstu.specialities[i]);
    }

    td.appendChild(select);
    tr.appendChild(td);
}

function createBtn(btnText, func, parameters) {
    let btn = document.createElement("button");
    btn.className = 'btn btn-dark';
    let textInBtn = document.createTextNode(btnText);
    btn.appendChild(textInBtn);

    if (func !== undefined) {
        btn.onclick = function () {
            func(parameters);
        };
    }
    return btn;
}

function isTableExists(name) {
    let t;
    if ((t = document.getElementById(name)) !== null) {
        t.remove();
    }
}