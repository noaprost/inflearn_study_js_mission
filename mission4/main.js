const bookTitleInput = document.querySelector("#title");
const bookAuthorInput = document.querySelector("#author");
const submitBtn = document.querySelector(".submit_btn");

const statusMessage = document.createElement("p");
statusMessage.classList.add("status_message");
statusMessage.classList.add("hidden");
const body = document.querySelector("body");
body.prepend(statusMessage);

let title = ""; // 새로운 제목
let author = ""; // 새로운 저자

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createBookList(title, author);
  title = "";
  author = "";
  bookTitleInput.value = "";
  bookAuthorInput.value = "";

  statusMessage.classList.remove("hidden");
  statusMessage.innerText = "책이 생성되었습니다.";
  setTimeout(() => {
    statusMessage.classList.add("hidden");
  }, 1500);
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

    statusMessage.classList.remove("hidden");
    statusMessage.innerText = "책이 삭제되었습니다.";
    setTimeout(() => {
      statusMessage.classList.add("hidden");
    }, 1500);
  });

  listContainer.appendChild(titleEl);
  listContainer.appendChild(authorEl);
  listContainer.appendChild(deleteBtn);

  const list = document.querySelector(".list");

  list.appendChild(listContainer);
}
