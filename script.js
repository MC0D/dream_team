// var
const main = document.createElement("main");
const sectionPosts = document.createElement("section");
const postsContainer = document.createElement("div");

// appendChild
const sectionComments = document.createElement("section");
const commentsContainer = document.createElement("div");
const commentsButtonContainer = document.createElement("div");
const prevButton = document.createElement("button");
const nextButton = document.createElement("button");
const postsNextButton = document.createElement("button");
const postsPrevButton = document.createElement("button");
const postsPagination = document.createElement("div");

sectionComments.id = "sectionComments";
commentsContainer.id = "divComments";
commentsButtonContainer.id = "commentsButtonContainer";
prevButton.id = "prevButton";
nextButton.id = "nextButton";
postsPagination.id = "postsPagination";

prevButton.textContent = "Précédent";
nextButton.textContent = "Suivant";

document.body.appendChild(main);
main.appendChild(sectionPosts);
sectionPosts.appendChild(postsContainer);
sectionPosts.appendChild(postsPagination);
postsPagination.appendChild(postsPrevButton);
postsPagination.appendChild(postsNextButton);

// ID
sectionPosts.id = "sectionPosts";
postsContainer.id = "postContainer";
postsNextButton.id = "postsNextButton";
postsPrevButton.id = "postsPrevButton";

postsPagination.style.display = "flex";
postsPagination.style.gap = "25px";
postsPagination.style.justifyContent = "center";

postsPrevButton.style.backgroundColor = "red";
postsPrevButton.style.width = "25%";
postsPrevButton.textContent = "Précédent";
postsPrevButton.style.color = "green";

postsNextButton.style.backgroundColor = "red";
postsNextButton.style.width = "25%";
postsNextButton.textContent = "Suivant";
postsNextButton.style.color = "green";
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
  } catch (error) {
    console.log("Erreur lors de la récupération des posts dans l'API", error);
  }
}

//show posts

//posts pagination

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

async function app() {
  let currentPage = 1;
  const commentsPerPage = 20;
  let allComments = [];

  const baseUrl = "https://jsonplaceholder.typicode.com";
  const usersFetchData = await fetchData(`${baseUrl}/users`, displayUsers);
  const commentsFetchData = await fetchData(`${baseUrl}/comments`, (data) => {
    allComments = data;
    displayComments();
  });
  const postsFetchData = await fetchData(`${baseUrl}/posts`, displayPosts);
  console.log("blabla", usersFetchData);
  console.log("blabla", commentsFetchData);
  console.log("blablabla", postsFetchData);

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

  /* EVENT SUR LES BOUTONS */

  buttonUsers.addEventListener("click", usersFetchData);
  nextButtonUsers.addEventListener("click", () => {
    currentPageUsers += 1;
    console.log(usersFetchData);

    displayUsers(usersFetchData);
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPageUsers > totalPages) {
      currentPageUsers = 1;
    }
  });

  main.appendChild(sectionComments);
  sectionComments.appendChild(commentsContainer);
  main.appendChild(commentsButtonContainer);
  commentsButtonContainer.appendChild(prevButton);
  commentsButtonContainer.appendChild(nextButton);

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

  postsPrevButton.addEventListener("click", () => {
    if (postCurrentPage > 1) {
      postCurrentPage--;
      displayPosts();
    }
  });

  postsNextButton.addEventListener("click", () => {
    if (postCurrentPage < Math.ceil(allPosts.length / postsPerPage)) {
      postCurrentPage++;
      displayPosts();
    }
  });

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
}
app();
