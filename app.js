// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

// UI Constructor
function UI() {};
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');
  // Create tr element
  const row = document.createElement('tr');
  row.innerHTML = `<td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.isbn}</td>
                   <td><a href='#' class='delete'>X</a></td>`;

  list.appendChild(row);
};

UI.prototype.showAlert = function (msg, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearInputFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

// Even Listener for add Book
document.querySelector('#book-form').addEventListener('submit', function (e) {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Instantiate Book object
  const oBook = new Book(title, author, isbn);

  // Instantiate UI object
  const oUI = new UI();

  // Validate input
  if (title === '' || author === '' || isbn === '') {
    // Show Error Alert
    oUI.showAlert('Please fill all input fields', 'error');
  } else {

    // Add book to list
    oUI.addBookToList(oBook);

    oUI.showAlert('Book Added!', 'success');

    // Clear input fields
    oUI.clearInputFields();
  }

  console.log(oBook);

  e.preventDefault();
});

// Even Listener for delete
document.querySelector('#book-list').addEventListener('click', function (e) {

  const oUi = new UI();

  oUi.deleteBook(e.target);

  oUi.showAlert('Book Removed!', 'success');

  e.preventDefault();
});