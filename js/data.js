const MAIN_KEY = 'book-data';
let books = [];

function storageExistance () {
  if (typeof Storage === undefined) {
    alert ('browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData () {
  const parsed = JSON.stringify (books);
  localStorage.setItem (MAIN_KEY, parsed);
  document.dispatchEvent (new Event ('ondatasaved'));
}

function loadDataFromStorage () {
  const serializedData = localStorage.getItem (MAIN_KEY);
  let data = JSON.parse (serializedData);

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent (new Event ('ondataloaded'));
}

function updateDataToStorage () {
  if (storageExistance ()) saveData ();
}

function composeBooksObj (title, author, year, isRead) {
  return {
    id: +new Date (),
    title,
    author,
    year,
    isRead,
  };
}

function findBook (bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex (bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }
  return -1;
}
