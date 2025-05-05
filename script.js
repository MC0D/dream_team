const main = document.createElement("main");
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