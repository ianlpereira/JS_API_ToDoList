//Declaração de variáveis usadas no JS
const postlist = document.querySelector(".post-list");

let output = "";

const url = "https://jsonplaceholder.typicode.com/users";

//Renderiza todos os usuários
let renderPosts = (posts) => {
  posts.forEach((user) => {
    output += `
        <div class="card-user" id="${user.id}"   onclick="location.href='usuario.html'">
        <h2>ID do Usuário: ${user.id}</h2>
        <h1>Nome: ${user.name}</h1>
        <h2>Usuário: ${user.username}</h2>
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
