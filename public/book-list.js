async function loadBooks() {
  let response = await fetch("http://localhost:3000/books", { method: "GET" });

  console.log(response.status); //200
  console.log(response.statusText); //OK

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const books = JSON.parse(data);
    document.getElementById("books").innerHTML = ""; //clear existing books

    for (let book of books) {
      const x = `
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                    <div>Author: ${book.author}</div>
                    <div>Publisher: ${book.publisher}</div>
                    <div>Number of Pages : ${book.pagecount}</div>

                    <hr />

                    <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                    <button
                        types="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#editBooksModal"
                        onClick="setEditModal(${book.isbn})"
                    >
                    Edit
                    </button>
                </div>
            </div>
        </div>
    `;

      document.getElementById("books").innerHTML =
        document.getElementById("books").innerHTML + x;
    }
  }
}

async function setEditModal(isbn) {
  let response = await fetch(`http://localhost:3000/books/${isbn}`);

  console.log(response.status); //200
  console.log(response.statusText); //OK

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const book = JSON.parse(data);

    const { title, author, publisher, publishdate, pagecount } = book;

    document.getElementById("isbn").value = isbn;
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("publisher").value = publisher;
    document.getElementById("publishdate").value = publishdate;
    document.getElementById("pagecount").value = pagecount;

    //setting up action url for the book
    document.getElementById(
      "editForm"
    ).action = `http://localhost:3000/books/${isbn}`;

    $("#editBookModal").modal("show");
  }
}

async function deleteBook(isbn) {
  let response = await fetch(`http://localhost:3000/books/${isbn}`, {
    method: "DELETE",
  });

  console.log(response.status); //200
  console.log(response.statusText); //OK

  if (response.status === 200) {
    loadBooks(); //reload after deleting a book
  }
}

// window.onload = function () {
//   loadBooks();
// };
