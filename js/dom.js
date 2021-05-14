const UNREAD_BOOK_LIST = 'incompleteBookshelfList';
const COMPLETE_BOOK_LIST = 'completeBookshelfList';
const ITEM_ID = 'item-id';

function addBook () {
  const unreadBookList = document.getElementById (UNREAD_BOOK_LIST);
  const finishBookList = document.getElementById (COMPLETE_BOOK_LIST);

  const bookTitle = document.getElementById ('inputBookTitle').value;
  const bookAuthor = document.getElementById ('inputBookAuthor').value;
  const bookYear = document.getElementById ('inputBookYear').value;
  if (document.getElementById ('inputBookIsComplete').checked) {
    isRead = true;
  } else {
    isRead = false;
  }

  const book = makeBookList (bookTitle, bookAuthor, bookYear, isRead);
  const bookObject = composeBooksObj (bookTitle, bookAuthor, bookYear, isRead);
  book[ITEM_ID] = bookObject.id;
  books.push (bookObject);
  if (isRead) {
    finishBookList.append (book);
  } else {
    unreadBookList.append (book);
  }

  updateDataToStorage ();
}

function makeBookList (title, author, year, isRead) {
  const articleSection = document.createElement ('article');
  articleSection.classList.add ('book_item');

  const bookTitle = document.createElement ('h3');
  bookTitle.innerText = title;
  const bookAuthor = document.createElement ('p');
  bookAuthor.innerText = author;
  const bookYear = document.createElement ('p');
  bookYear.innerText = year;

  const actionWrapper = document.createElement ('div');
  actionWrapper.classList.add ('action');

  if (isRead) {
    actionWrapper.append (createUndoFinishedButton (), createRemoveButton ());
  } else {
    actionWrapper.append (createFinishedButton (), createRemoveButton ());
  }
  articleSection.append (bookTitle, bookAuthor, bookYear, actionWrapper);

  return articleSection;
}

function createButton (buttonClass, innerText, eventListener) {
  const button = document.createElement ('button');
  button.classList.add (buttonClass);
  button.innerText = innerText;
  button.addEventListener ('click', event => {
    eventListener (event);
  });
  return button;
}

function addToCompleted (bookElement) {
  bookElementParent = bookElement.parentElement;
  const title = bookElementParent.querySelector ('h3').innerText;
  const author = bookElementParent.querySelectorAll ('p')[0].innerText;
  const year = bookElementParent.querySelectorAll ('p')[1].innerText;

  const newBook = makeBookList (title, author, year, true);
  const completedBookList = document.getElementById (COMPLETE_BOOK_LIST);
  const book = findBook (bookElementParent[ITEM_ID]);
  book.isRead = true;
  newBook[ITEM_ID] = book.id;

  completedBookList.append (newBook);
  bookElementParent.remove ();

  updateDataToStorage ();
}

function undoCompleted (bookElement) {
  bookElementParent = bookElement.parentElement;
  const title = bookElementParent.querySelector ('h3').innerText;
  const author = bookElementParent.querySelectorAll ('p')[0].innerText;
  const year = bookElementParent.querySelectorAll ('p')[1].innerText;

  const newBook = makeBookList (title, author, year, false);
  const completedBookList = document.getElementById (UNREAD_BOOK_LIST);
  const book = findBook (bookElementParent[ITEM_ID]);
  book.isRead = false;
  newBook[ITEM_ID] = book.id;
  completedBookList.append (newBook);
  bookElementParent.remove ();

  updateDataToStorage ();
}

function createFinishedButton () {
  return createButton ('green', 'Selesai dibaca', event => {
    addToCompleted (event.target.parentElement);
  });
}

function createUndoFinishedButton () {
  return createButton ('green', 'Belum selesai dibaca', event => {
    undoCompleted (event.target.parentElement);
  });
}

function createRemoveButton () {
  return createButton ('red', 'Hapus buku', event => {
    const ev = event.target.parentElement.parentElement;
    const confirm = window.confirm ('Anda yakin menghapus buku ini?');
    if (confirm) {
      const booksPos = findBookIndex (ev[ITEM_ID]);
      books.splice (booksPos, 1);
      ev.remove ();

      updateDataToStorage ();
    }
  });
}
