// var
const main = document.createElement("main");
const sectionPosts = document.createElement("section");
const postsContainer = document.createElement("div");

// appendChild
document.body.appendChild(main);
main.appendChild(sectionPosts);
sectionPosts.appendChild(postsContainer);

// ID
sectionPosts.id = "sectionPosts";
postsContainer.id = "postContainer";

// function
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

    const postsData = await responsePosts.json();

    postsData.forEach((post) => {
      const postElement = document.createElement("article");
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.log("Erreur lors de la récupération des posts dans l'API", error);
  }
}

postsFetchData();
