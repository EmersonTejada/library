//Creamos nuestra variable donde estaran almacenados los libros, por ende debe ser un array
const myLibrary = [];

//Construimos el constructor para los  libros
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//Creamos una funcion para pasar crear un libro nuevo con los parametros de la funcion Book para asi agregarlo al array myLibrary
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

//Crear funcion para mostrar los libros en el container asignado en el html
function displayBooks() {
  const container = document.querySelector(".book-container"); //Referenciamos el container mediante su clase .book-container
  container.innerHTML = ""; //Vaciamos el contenedor

  //Realizamos un loop por cada elemento del array para que cree un div con su clase
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttonsContainer");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = `${book.title}`;

    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = `${book.author}`;

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `${book.pages} pages`;

    const isRead = document.createElement("div");
    isRead.classList.add("isRead");
    isRead.textContent = book.isRead ? "Read" : "Unread";

    bookDetails.appendChild(title);
    bookDetails.appendChild(author);
    bookDetails.appendChild(pages);
    bookDetails.appendChild(isRead);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => removeBook(book));

    const statusButton = document.createElement("button");
    statusButton.classList.add("status-button");
    statusButton.textContent = book.isRead ? "Read" : "Unread";
    statusButton.classList.toggle("read", book.isRead);
    statusButton.addEventListener("click", () => {
      book.isRead = !book.isRead;
      displayBooks();
    });

    bookCard.appendChild(bookDetails);
    bookCard.appendChild(buttonsContainer);
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(statusButton);
    container.appendChild(bookCard);
  });
}

function removeBook(book) {
  const index = myLibrary.indexOf(book);
  if (index > -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

//Libros de prueba
addBookToLibrary(
  "Alicia en el país de las maravillas",
  "Lewis Carroll Shakespeare",
  250,
  true
);

addBookToLibrary(
  "Las aventuras de Sherlock Holmes",
  "Arthur Conan Doyle",
  500,
  false
);

displayBooks();

document.addEventListener("DOMContentLoaded", () => {
  const createBookButton = document.querySelector(".createBookButton");
  const bookDialog = document.querySelector("#bookDialog");
  const closeDialog = document.querySelector("#closeDialog");
  const bookForm = document.querySelector("#bookForm");

  createBookButton.addEventListener("click", () => {
    bookDialog.style.display = "flex";
  });

  closeDialog.addEventListener("click", () => {
    bookDialog.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target == bookDialog) {
      bookDialog.style.display = "none";
    }
  });

  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
    addBookToLibrary(title, author, pages, isRead);
    bookDialog.style.display = "none";
    bookForm.reset();
  });
});
