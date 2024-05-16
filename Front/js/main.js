const URL_BASE = "http://localhost:3000";

window.onload = readAll; // Carrega os professores ao iniciar

function callAPI(url, method, callback, data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function () {
    callback(xhr.status, xhr.response);
  };

  if (data) {
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
}

function readAll() {
  const url = URL_BASE + "/professors";
  callAPI(url, 'GET', (status, response) => {
    if (status === 200) {
      const content = document.getElementById('content');
      content.innerHTML = "";
      response.forEach(professor => {
        content.innerHTML += createCard(professor);
      });
    } else {
      alert("Erro ao obter professores: " + status);
    }
  });
}

function createProfessor() {
  event.preventDefault();
  const professor = {
    name: document.getElementById('name').value,
    courses: document.getElementById('courses').value,
    tia: document.getElementById('tia').value,
    subject: document.getElementById('subject').value,
  };

  const url = URL_BASE + "/professors";
  callAPI(url, "POST", (status, response) => {
    if (status === 201) { 
      readAll();
      clearForm();
    } else {
      alert("Erro ao criar professor: " + status);
    }
  }, professor);
}

function deleteProfessor(tia) {
  const confirmacao = confirm(`Deseja realmente apagar o professo com o tia: ${tia}?`);
  if (confirmacao) {
    const url = URL_BASE + "/professors/" + tia;
    callAPI(url, "DELETE", (status, response) => {
      if (status === 200 || status === 204) { 
        readAll();
      } else {
        alert("Erro ao excluir professor com ID: " + status);
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
        readAll();
        
    } else {
      alert("Erro ao obter professor: " + status);
    }
  });
}

function updateProfessor(tia) {
  event.preventDefault();
  const professor = {
    name: document.getElementById('name').value,
    courses: document.getElementById('courses').value,
    subject: document.getElementById('subject').value
  };

  const url = URL_BASE + "/professors/" + tia;

  callAPI(url, "PATCH", (status, response) => {
    if (status === 200) {
      readAll();
      clearForm();
      // Reverte o botão para "Inserir" e redefine a função para createProfessor
      document.getElementById('button').innerHTML = "Inserir";
      document.getElementById('button').onclick = createProfessor;
    } else {
      alert("Erro ao atualizar professor: " + status);
    }
  }, professor);
}


function clearForm() {
  document.getElementById('name').value = "";
  document.getElementById('tia').value = "";
  document.getElementById('courses').value = "";
  document.getElementById('subject').value = "";
}

function createCard(professor) {
var str = "<article>";
    str += "<h3> name: " + professor.name + "</h1>";
    str += "<p> id: " + professor.id + "</p>";
    str += "<p> tia: " + professor.tia + "</p>";
    str += "<p> course: " + professor.courses + "</p>";
    str += "<p> subject: " + professor.subject + "</p>";
    str += "<button onclick='deleteProfessor(" +professor.tia+")'>X</button>";
    str += "<button onclick='readProfessor(" + professor.tia + ")'>Editar</button>"; // Passa o TIA
    str += "</article>";
    return str;}
