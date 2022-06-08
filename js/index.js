// const startApp = () => {
//   const body = document.querySelector('body');
//   body.innerHTML = '<h2>JAVASCRIPT ENABLED</h2>';
// };

// startApp(); {title: "shadow hunter", author: "clary"}
const bookList = [];
const bookForm = document.querySelector('#add_book_form');

const addBook = (e) => {
  e.preventDefault();

  const bookFormInputs = document.querySelectorAll('.book_form_values');
  const newBook = { title: '', author: '' };
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

bookForm.addEventListener('submit', addBook);
