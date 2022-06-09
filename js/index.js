// const bookList = [
//   { id: '1', title: 'shadow hunter', author: 'clary' },
//   { id: '2', title: 'book2', author: 'jamiu' },
//   { id: '3', title: 'book3', author: 'jamiu' },
//   { id: '4', title: 'book4', author: 'basitah' },
//   { id: '5', title: 'book5', author: 'yakeen' },
// ];

let bookList = [];

const bookForm = document.querySelector('#add_book_form');
const bookContainer = document.querySelector('#book_container');

const localStorageDatabase = {
  getItems(databaseName) {
    return localStorage.getItem(databaseName) ? JSON.parse(localStorage.getItem(databaseName)) : [];
  },
  setItemToDatabase(databaseName, items) {
    return localStorage.setItem(databaseName, JSON.stringify(items));
  },
};

const dynamicId = () => {
  const a = '';
  const c = Date.now() / 1000;
  let d = c
    .toString(16)
    .split('.')
    .join('');
  while (d.length < 14) d += '0';
  const id = a + d;

  return id;
};

const removeBookFunc = id => {
  const bookToRemove = bookList.filter(book => book.id === id)[0];
  const indexOfBook = bookList.indexOf(bookToRemove);
  bookList.splice(indexOfBook, 1);
  localStorageDatabase.setItemToDatabase('books', bookList);
};

const removeBookFromUi = e => {
  e.preventDefault();
  e.stopPropagation();
  const {
    target: {
      classList,
      dataset: { removeBook },
    },
    currentTarget,
  } = e;
  if (classList.contains('remove_book_button')) {
    bookContainer.removeChild(currentTarget);
  }
  const bookId = removeBook;
  removeBookFunc(bookId);
};

const displayBookOnUi = ({ title, author, id }) => {
  const newBookElement = document.createElement('li');
  newBookElement.className = 'book-list-item';
  newBookElement.id = `book_div_${id}`;
  newBookElement.innerHTML = `
    <div class="book_element_info" id="book_div_${id}">
      <h2>${title}</h2>
      <p>${author}</p>
      <button type="button" id="remove_book_${id}" class="remove_book_button" data-remove-book="${id}">Remove</button>
    </div>
  `;
  newBookElement.addEventListener('click', removeBookFromUi.bind(this));
  bookContainer.append(newBookElement);
};

const addBook = e => {
  e.preventDefault();
  const bookFormInputs = document.querySelectorAll('.book_form_values');
  const bookId = dynamicId();
  const newBook = { id: bookId, title: '', author: '' };
  bookFormInputs.forEach(input => {
    if (input.id === 'title') {
      newBook.title = input.value;
    } else {
      newBook.author = input.value;
    }
  });
  bookList.push(newBook);
  displayBookOnUi(newBook);
  localStorageDatabase.setItemToDatabase('books', bookList);
  bookForm.reset();
};

const allBookCollection = () => {
  bookList = localStorageDatabase.getItems('books');
  bookList.forEach(book => {
    displayBookOnUi(book);
  });
};

const removeBookButtons = document.querySelectorAll('.remove_book_button');
removeBookButtons.forEach(element => {
  element.addEventListener('click', removeBookFromUi);
});

bookForm.addEventListener('submit', addBook);

allBookCollection();
