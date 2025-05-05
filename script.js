// var
const main = document.createElement("main");
const sectionPosts = document.createElement("section");
const postsContainer = document.createElement("div");
const paginationPostContainer = document.createElement("div");

// appendChild
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
