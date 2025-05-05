const main = document.createElement("main");
document.body.appendChild(main);
const sectionUsers = document.createElement("section");
sectionUsers.id = "sectionUsers";
main.appendChild(sectionUsers);
const buttonUsers = document.createElement("button");
buttonUsers.textContent = "Affiche les 5 premiers utilisateurs";
sectionUsers.appendChild(buttonUsers);
const partieUsers = document.createElement("ul");
sectionUsers.appendChild(partieUsers);
const nextButtonUsers = document.createElement("button");
nextButtonUsers.textContent = "Affiche les 5 suivants";
sectionUsers.appendChild(nextButtonUsers);
nextButtonUsers.disabled = true;

/* CREATION DE VARIABLE POUR MES FONCTIONS */

let users = [];
let currentPageUsers = 1;
let usersPerPage = 5;

/* RECUPERATION DE DONNEES VIA LAPI */

async function usersFetchData() {
  const responseUsers = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const dataUsers = await responseUsers.json();
  dataUsers.forEach((user) => {
    users.push(user.name);
  });
  displayUsers();
  nextButtonUsers.disabled = false;
}

/* AFFICHAGE DES UTILISATEURS */

function displayUsers() {
  partieUsers.innerHTML = "";
  let startIndex = (currentPageUsers - 1) * usersPerPage;
  let endIndex = startIndex + usersPerPage;
  let usersToShow = users.slice(startIndex, endIndex);
  usersToShow.forEach((userName) => {
    const liUsers = document.createElement("li");
    liUsers.textContent += userName;
    partieUsers.appendChild(liUsers);
  });
}

/* EVENT SUR LES BOUTONS */

buttonUsers.addEventListener("click", usersFetchData);
nextButtonUsers.addEventListener("click", () => {
  currentPageUsers += 1;
  displayUsers();
  const totalPages = Math.ceil(users.length / usersPerPage);
  if (currentPageUsers > totalPages) {
    currentPage = 1;
  }
});
