var express = require('express'),
	app = express();	
app.set('port', 8080);
app.use(express.static(__dirname));
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
const jsonParser = express.json();

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/user/select", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    response.json(JSON.stringify(users.filter(f => f.isActive))); // отправляем пришедший ответ обратно
});

app.get("/user/select", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    response.json(JSON.stringify(users.filter(f => f.isActive))); // отправляем пришедший ответ обратно
});

app.post("/user/update", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    users.forEach(f => {
        if (f.id === request.body[0]) {
            f.name = request.body[1];
            f.surname = request.body[2];
            f.speciality = request.body[3];
        }
    });

    response.json(JSON.stringify(true)); // отправляем пришедший ответ обратно
});

app.post("/user/del", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    users.forEach(f => {
        if (f.id === request.body.id) f.isActive = false;
    });
    response.json(JSON.stringify(true)); // отправляем пришедший ответ обратно
});

app.post("/user/create", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    let flag = true;
    users.forEach(f => {
        if (f.name === request.body.name &&
        f.surname === request.body.surname &&
        f.speciality === request.body.speciality)
            flag = false;
    });
    if (flag) {
        let user = {
            id: users.length + 1,
            name: request.body.name,
            surname: request.body.surname,
            speciality: request.body.speciality,
            isActive: true
        };
        users.push(user);
        response.json(JSON.stringify(user)); // отправляем пришедший ответ обратно
    }
});

let admin = {
    id: 1,
    name: "Admin",
    surname: "Admin",
    speciality: "IT",
    isActive: true
};

let users = [admin];