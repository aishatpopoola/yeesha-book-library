// const startApp = () => {
//   const body = document.querySelector('body');
//   body.innerHTML = '<h2>JAVASCRIPT ENABLED</h2>';
// };

// startApp();

const bookList = [
  { id: '1', title: 'shadow hunter', author: 'clary' },
  { id: '2', title: 'book2', author: 'jamiu' },
  { id: '3', title: 'book2', author: 'jamiu' },
  { id: '4', title: 'book3', author: 'basitah' },
  { id: '5', title: 'book4', author: 'yakeen' },
];
const bookForm = document.querySelector('#add_book_form');
const bookContainer = document.querySelector('#book_container');

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

const addBook = (e) => {
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
  bookForm.reset();
};

const displayBookOnUi = ({ title, author, id }) => {
  const newBookElement = document.createElement('li');
  newBookElement.className = 'book-list-item';
  newBookElement.innerHTML = `
    <div class="book_element_info" id="book_div_${id}">
      <h2>${title}</h2>
      <p>${author}</p>
      <button type="button" id="remove_book_${id}" data-remove-book="book_div_${id}">Remove</button>
    </div>
  `;
  // newBookElement.addEventListener('click', displayBookOnUi.bind(null, id));
  bookContainer.append(newBookElement);
};

const allBookCollection = () => {
  bookList.forEach(element => {
    displayBookOnUi(element);
  });
};

const removeBook = (id) => {
  const bookToRemove = bookList.filter((book) => book.id === id);
};

bookForm.addEventListener('submit', addBook);

allBookCollection();