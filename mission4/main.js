const bookTitleInput = document.querySelector("#title");
const bookAuthorInput = document.querySelector("#author");
const submitBtn = document.querySelector(".submit_btn");

let title = ""; // 새로운 제목
let author = ""; // 새로운 저자

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createBookList(title, author);
  title = "";
  author = "";
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
});

bookTitleInput.addEventListener("change", handleTitleChange);
bookAuthorInput.addEventListener("change", handleAuthorChange);

function handleTitleChange(e) {
  title = e.target.value;
}

function handleAuthorChange(e) {
  author = e.target.value;
}

function createBookList(title, author) {
  const titleEl = document.createElement("p");
  titleEl.innerText = title;

  const authorEl = document.createElement("p");
  authorEl.innerText = author;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "x";
  deleteBtn.className = "delete";

  const listContainer = document.createElement("div");
  listContainer.className = "list_container";

  deleteBtn.addEventListener("click", () => {
    listContainer.remove(deleteBtn.parentElement);
  });

  listContainer.appendChild(titleEl);
  listContainer.appendChild(authorEl);
  listContainer.appendChild(deleteBtn);

  const list = document.querySelector(".list");

  list.appendChild(listContainer);
}
