const main = document.createElement("main");
const sectionComments = document.createElement("section");
const commentsContainer = document.createElement("div")
sectionComments.id = "sectionComments";
commentsContainer.id = "divComments"
document.body.appendChild(main);
main.appendChild(sectionComments);
sectionComments.appendChild(commentsContainer)

async function commentsFetchData() {
    try{
        const commentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
        if (!commentsResponse.ok){
            throw new Error ("Network response was not ok");
        }
        const commentsData = await commentsResponse.json();
        console.log(commentsData);
        commentsData.forEach(comments => {
            const commentsElement = document.createElement("article");
            commentsElement.innerHTML = `
            <h3>${comments.name}</h3>
            <p>${comments.body}</p>`;
            commentsContainer.appendChild(commentsElement);
        });
    }
    catch(error) {
        console.log(error)
    }
}
commentsFetchData();