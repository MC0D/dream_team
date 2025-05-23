// var
const main = document.createElement("main");
const sectionPosts = document.createElement("section");
const postsContainer = document.createElement("div");
const paginationPostContainer = document.createElement("div");

// appendChild
const sectionComments = document.createElement("section");
const commentsContainer = document.createElement("div");
const commentsButtonContainer = document.createElement("div");
const prevButton = document.createElement("button");
const nextButton = document.createElement("button");

sectionComments.id = "sectionComments";
commentsContainer.id = "divComments";
commentsButtonContainer.id = "commentsButtonContainer";
prevButton.id = "prevButton";
nextButton.id = "nextButton";

prevButton.textContent = "Précédent";
nextButton.textContent = "Suivant";

document.body.appendChild(main);
main.appendChild(sectionPosts);
sectionPosts.appendChild(postsContainer);
sectionPosts.appendChild(paginationPostContainer);

// ID
sectionPosts.id = "sectionPosts";
postsContainer.id = "postContainer";
paginationPostContainer.id = "paginationPostContainer";

// Paginification
let allPosts = [];
let postCurrentPage = 1;
const postsPerPage = 5;

// fetch function
async function postsFetchData() {
  try {
    const responsePosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (responsePosts.status === 200) {
      console.log("status 200: Les posts ont été ajoutés avec succès");
    } else if (responsePosts.status === 404) {
      throw new Error("Ressources not found");
    }

    allPosts = await responsePosts.json();
    displayPosts();
    displayPostPagination();
  } catch (error) {
    console.log("Erreur lors de la récupération des posts dans l'API", error);
  }
}

//show posts
function displayPosts() {
  postsContainer.innerHTML = "";
  const postStart = (postCurrentPage - 1) * postsPerPage;
  const postsEnd = postStart + postsPerPage;
  const paginatedPosts = allPosts.slice(postStart, postsEnd);
  paginatedPosts.forEach((post) => {
    const postElement = document.createElement("span");
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

//posts pagination
function displayPostPagination() {
  paginationPostContainer.innerHTML = "";
  const postsTotalPages = Math.ceil(allPosts.length / postsPerPage);
  for (let i = 1; i <= postsTotalPages; i++) {
    const postButton = document.createElement("button");
    postButton.textContent = i;
    postButton.classList.add("paginationPostButton");
    if (i === postCurrentPage) {
      postButton.classList.add("active");
    }
    postButton.addEventListener("click", () => {
      postCurrentPage = i;
      displayPosts();
      displayPostPagination();
    });
    paginationPostContainer.appendChild(postButton);
  }
}

postsFetchData();
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

/* CREATION DE VARIABLE POUR MES FONCTIONS */

let users = [];
let currentPageUsers = 1;
let usersPerPage = 5;

/* RECUPERATION DE DONNEES VIA LAPI */

/* async function usersFetchData() {
  const responseUsers = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const dataUsers = await responseUsers.json();
  dataUsers.forEach((user) => {
    users.push(user.name);
  });
  displayUsers(dataUsers);
  nextButtonUsers.disabled = false;
}
 */
/* AFFICHAGE DES UTILISATEURS */

async function app() {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const usersFetchData = await fetchData(`${baseUrl}/users`, displayUsers);
  console.log("blabla", usersFetchData);

  function displayUsers(dataUsers) {
    console.log(dataUsers);

    dataUsers.forEach((user) => {
      users.push(user.name);
    });
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
    console.log(usersFetchData);

    displayUsers(usersFetchData);
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPageUsers > totalPages) {
      currentPage = 1;
    }
  });

  main.appendChild(sectionComments);
  sectionComments.appendChild(commentsContainer);
  main.appendChild(commentsButtonContainer);
  commentsButtonContainer.appendChild(prevButton);
  commentsButtonContainer.appendChild(nextButton);

  let currentPage = 1;
  const commentsPerPage = 20;
  let allComments = [];

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayComments();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(allComments.length / commentsPerPage)) {
      currentPage++;
      displayComments();
    }
  });

  async function commentsFetchData() {
    try {
      const commentsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (!commentsResponse.ok) {
        throw new Error("Network response was not ok");
      }
      allComments = await commentsResponse.json();
      displayComments();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function fetchData(url, fn) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      fn(data);
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  function displayComments() {
    commentsContainer.innerHTML = "";
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const commentsToDisplay = allComments.slice(startIndex, endIndex);

    commentsToDisplay.forEach((comment) => {
      const commentsElement = document.createElement("article");
      commentsElement.innerHTML = `
      <h3>${comment.name}</h3>
      <p>${comment.body}</p>`;
      commentsContainer.appendChild(commentsElement);
    });
  }

  commentsFetchData();
}

app();
