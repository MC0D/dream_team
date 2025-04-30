/* 3. Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination) :

    Utilisez l'API https://jsonplaceholder.typicode.com/users.
    Affichez les 5 premiers utilisateurs sur la page.
    Ajoutez des boutons de pagination pour charger les utilisateurs suivants (affichage de 5 utilisateurs par page). Lorsqu'on clique sur le bouton "Suivant", les 5 utilisateurs suivants doivent être chargés. */

const main = document.createElement("main");
document.body.appendChild(main);
const sectionUsers = document.createElement("section");
sectionUsers.id = "sectionUsers";
main.appendChild(sectionUsers);
const buttonUsers = document.createElement("button");
buttonUsers.textContent = "Affiche les 5 premiers utilisateurs";
sectionUsers.appendChild(buttonUsers);
const partieUsers = document.createElement("p");
sectionUsers.appendChild(partieUsers);

async function usersFetchData() {
  const responseUsers = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const dataUsers = await responseUsers.json();
  dataUsers.forEach((user) => {
    console.log(user.name);
    partieUsers.textContent += user.name;
  });
}
usersFetchData();

buttonUsers.addEventListener("click", usersFetchData);
