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
  const confirmacao = confirm(`Deseja realmente apagar o professor ${name}?`);
  if (confirmacao) {
    const url = URL_BASE + "/professors/" + name; 
    callAPI(url, "DELETE", (status, response) => {
      if (status === 200) { 
        readAll();
        clearForm(); 
      } else {
        alert("ERRO: " + status + " Não foi possível excluir o professor");
      }
    });
  }
}

function readProfessor(tia) { 
  const url = URL_BASE + "/professors/" + tia; 
  callAPI(url, "GET", (status, professor) => {
    if (status === 200) {
      document.getElementById('name').value = professor.name;
      document.getElementById('tia').value = professor.tia;
      document.getElementById('courses').value = professor.courses; 
      document.getElementById('subject').value = professor.subject;
      document.getElementById('button').innerHTML = "Atualizar";
      document.getElementById('button').onclick = function() { updateProfessor(tia); };
    } else {
      alert("ERRO: " + status + " Não foi possível encontrar o professor");
    }
  });
}

function updateProfessor(tia) {
  event.preventDefault();
  const professor = {
    name: document.getElementById('name').value,
    tia: document.getElementById('tia').value,
    courses: document.getElementById('courses').value, 
    subject: document.getElementById('subject').value
  };

  const url = URL_BASE + "/professors/" + tia;

  callAPI(url, "PATCH", (status, response) => {
    if (status === 200) { 
      readAll();
      clearForm();
      document.getElementById('button').innerHTML = "Inserir";
      document.getElementById('button').onclick = createProfessor;
    } else {
      alert("ERRO: " + status + " Não foi possível atualizar os dados");
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