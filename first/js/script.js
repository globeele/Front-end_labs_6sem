const links = ["lab1.html", "lab2.html", "lab3.html", "lab4.html", "lab5.html", "lab6.html"];

window.onload = () => {
    let footer = document.getElementById("footer");
    footer.innerHTML = ("<div class='footer-content'>Copyright &copy; " + new Date().getFullYear()+ " Anastasiya Setko inc. All rights reserved.</div>");

    let elements = document.getElementsByClassName("lab");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            sidebarClickEvent(links[i]);
        };
    }
};

function sidebarClickEvent(page) {
    menu(page);
}

function menu(page) {
    loadContent(page);
    //window.location = links[index];
}

function loadContent(page) {
    const cont = document.getElementById('main-content');
    const http = createRequestObject();
    if (http) {
        http.open('GET', page);
        http.onload = () => {
            if (http.readyState === 4) {
                cont.innerHTML = http.responseText;
                let script = cont.getElementsByTagName('script');

                if (script[0] !== undefined) eval(script[0].innerText);
            }
        };
        http.send(null);
    } else {
        document.location = page;
    }
}

function createRequestObject() {
    try {
        return new XMLHttpRequest()
    } catch(e) {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch(e) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP')
            } catch(e) {
                return null; }
        }
    }
}