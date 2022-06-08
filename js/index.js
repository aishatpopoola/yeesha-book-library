// const startApp = () => {
//   const body = document.querySelector('body');
//   body.innerHTML = '<h2>JAVASCRIPT ENABLED</h2>';
// };

// startApp(); 

const bookList = [];
const bookForm = document.querySelector('#add_book_form');

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
  const newBook = {id: bookId, title: '', author: '' };
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

// const dummyLib = [
//   {id: '1', title: "shadow hunter", author: "clary"},
//   {id: '2', title: "book2", author: "jamiu"},
//   {id: '3', title: "book2", author: "jamiu"},
//   {id: '4', title: "book3", author: "basitah"},
//   {id: '5', title: "book4", author: "yakeen"},
// ]

// const remove_book_2 = document.querySelector('#remove_book_2');
const removeBook = (id) => {
  const bookToRemove = bookList.filter((book) => book.id === id);
  console.log(bookToRemove[0]);
}

bookForm.addEventListener('submit', addBook);
// remove_book_2.addEventListener('click', removeBook);

