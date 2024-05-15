const URL_BASE = "http://localhost:3000";

window.onload = function () {
    readAll();
}

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}


function readAll() {
    const url = URL_BASE + "/professors";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content');
            content.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var str = createCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function createProfessor() {
    event.preventDefault();
    var professor = {
        name: document.getElementById('name').value,
        course: document.getElementById('courses').value,
        tia: document.getElementById('tia').value,
        subject: document.getElementById('subject').value
    }

    const url = URL_BASE+/professors/;

    callAPI(url,"POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("ERRO: " + status + "Não foi possivel inserir um professor");
        }
    }, professor);
}

function deleteProfessor(name) {
    const resp = confirm('Deseja realmente apagar o professor com nome ' + name + '?');
    if (resp) {
        const url = URL_BASE + "/professors/" + name;
        callAPI(url, "DELETE", function () {
            readAll();
        });
    }alert("ERro")
}

function readProfessors(name) {
    const url = URL_BASE + "/professors/";
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('name').value = response.name;
            document.getElementById('tia').value = response.tia;
            document.getElementById('course').value = response.course;
            document.getElementById('subject').value = response.subject;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateProfessors;
        } else {
            alert("ERRO: " + status + "Não foi possivel encontrar o professor");
        }
    });
}

function updateProfessor() {
    event.preventDefault();
    var professor = {
        name: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        disciplinas: document.getElementById('disciplinas').value,
        course: document.getElementById('course').value
    }

    const url = URL_BASE + "/professors";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();

            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertProfessor;

        } else {
            alert("ERRO: " + status + "Não foi possivel atualizar os dados");
        }
    }, professor);
}

function clear() {
    document.getElementById('nome').value= "";
    document.getElementById('tia').value= "";
    document.getElementById('course').value= "";
    document.getElementById('subject').value= "";

}

function createCard(professor) {
    var str = "<article>";
    str += "<h3> name: " + professor.name + "</h1>";
    str += "<p> id: " + professor.id + "</p>";
    str += "<p> tia: " + professor.tia + "</p>";
    str += "<p> course: " + professor.courses + "</p>";
    str += "<p> subject: " + professor.subject + "</p>";
    str += "<button onclick='deleteProfessor(" +professor.name+")'>X</button>";
    str += "<button onclick='readProfessors(" + professor.tia +")'>Editar</button>";
    str += "</article>";
    return str;
}