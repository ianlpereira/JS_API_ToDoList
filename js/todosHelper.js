//Declaração de variáveis usadas no JS
const todoList = document.querySelector(".post-div");
const formTODO = document.querySelector(".todo-form");

let outputTodo = "";

let sessionData = sessionStorage.getItem("userId");
let url =
  "https://jsonplaceholder.typicode.com/users/" + sessionData + "/todos";

//Renderiza o formulário de criação de novo TODO no html
formTODO.innerHTML = `
  <h1>Olá Usuário: ${sessionData}</h1>
  <form id="addFormTodo" class="todo-form-render" onsubmit="addNovoTodo(event)">
    <input type="text" class="inp-txt" id="titulo"><br>
    <button type="submit" class="btn btn-primary" value="Submit">Nova Nota</button>
  </form>
`;

// Metodo GET - Recebe os TODOs de dado usuário
fetch(url)
  .then((res) => res.json())
  .then((dataTODO) => renderTodo(dataTODO));

//Renderiza os TODOS de dado usuário
let renderTodo = (posts) => {
  posts.forEach((todo) => {
    outputTodo += `
            <div class="card-user">
            <span class="textTODO" id="${todo.id}" type="text">${
      todo.title
    }</span>
            ${
              todo.completed
                ? `
                <input class="form-check-input" type="checkbox" id="${todo.id}" checked value="todoStatus" onclick="checkboxEdit(${todo.id}, checked)"></input>
                `
                : `
                <input class="form-check-input" type="checkbox" id="${todo.id}" value="todoStatus" onclick="checkboxEdit(${todo.id}, checked)"></input>
                `
            }
            </div>
            `;
  });
  todoList.innerHTML = outputTodo;
};

//Metodo POST que faz atualização na API do checkbox de estado do TODO
function checkboxEdit(checkboxId, todoStatus) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      userId: sessionData,
      id: checkboxId,
      completed: todoStatus,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  return console.log(checkboxId, todoStatus);
}

//Metodo POST que faz a adição de um novo TODO
document.getElementById("addFormTodo").onsubmit = function () {
  console.log(document.getElementById("titulo").value);
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: document.getElementById("titulo").value,
      userId: sessionData,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  return false;
};
