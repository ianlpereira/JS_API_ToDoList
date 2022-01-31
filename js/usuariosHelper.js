//Declaração de variáveis usadas no JS
const postlist = document.querySelector(".post-list");

let output = "";

const url = "https://jsonplaceholder.typicode.com/users";

//Renderiza todos os usuários
let renderPosts = (posts) => {
  posts.forEach((user) => {
    output += `
        <div class="card-user" id="${user.id}"   onclick="location.href='usuario.html'">
        <h1 >ID do Usuário:</h1><h2>${user.id}</h2>
        <h1>Nome: </h1><h2>${user.name}</h2>
        <h1>Usuário: </h1><h2>${user.username}</h2>
        </div>
        `;
  });
  postlist.innerHTML = output;
};

// Get - Recebe todos os elementos da API
// Metodo GET - Todos os usuários
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

postlist.addEventListener("click", (e) => {
  sessionStorage.setItem("userId", e.target.id);
});
