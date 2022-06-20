const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() {
    if (typeof (Storage) === 'undefined') {
        alert('Browser loe gak support');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id, 
        title,
        author,
        year,
        isCompleted
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function makeBookItem(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.classList.add('book-title');
    textTitle.innerText = bookObject.title;
    
    const bookInformation = document.createElement('div');
    bookInformation.classList.add('book-information');

    const textAuthor = document.createElement('span').innerText = 'Penulis: ' + bookObject.author;
    const divider = document.createElement('span').innerText = ' | ';
    const textYear = document.createElement('span').innerText = 'Tahun: ' + bookObject.year;

    bookInformation.append(textAuthor, divider, textYear);
    
    const container = document.createElement('div');
    container.classList.add('item');
    container.append(textTitle, bookInformation);
    
    const containerAction = document.createElement('div');
    containerAction.classList.add('item-action');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger-border');
    deleteBtn.innerText = 'Hapus';
    
    deleteBtn.addEventListener('click', function () {
        confirmDelete(bookObject);
    });

    container.append(containerAction);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {
        const unfinishedBtn = document.createElement('button');
        unfinishedBtn.classList.add('btn', 'btn-primary-border');
        unfinishedBtn.innerText = 'Belum dibaca';
     
        unfinishedBtn.addEventListener('click', function () {
            addBookToUnfinished(bookObject.id);
        });

        containerAction.append(unfinishedBtn, deleteBtn);

    } else {
        const finishedBtn = document.createElement('button');
        finishedBtn.classList.add('btn', 'btn-primary-border');
        finishedBtn.innerText = 'Sudah dibaca';
        
        finishedBtn.addEventListener('click', function () {
            addBookToFinished(bookObject.id);
        });
        
        containerAction.append(finishedBtn, deleteBtn);
    }

    return container;
}

function addBook() {
    const textTitle = document.getElementById('inputTitle').value;
    const textAuthor = document.getElementById('inputAuthor').value;
    const textYear = document.getElementById('inputYear').value;
    const checkbox = document.getElementById('inputIsComplete').checked;

    const generateID = generateId();
    const bookObject = generateBookObject(generateID, textTitle, textAuthor, Number(textYear), checkbox);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToFinished(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToUnfinished(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function confirmDelete(book) {
    document.getElementById('bookTitle').innerText = `Hapus buku "${book.title}" ?`;

    const modal = document.getElementById('confirmModal');
    const deleteBtn = document.getElementById('deleteButton');
    modal.style.display = 'block';

    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault;
        deleteBook(book.id);
        modal.style.display = 'none';
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('formInputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault;
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(SAVED_EVENT, () => {
    console.log('Local storage has been updated.');
});
  
document.addEventListener(RENDER_EVENT, function () {
    const unfinished = document.getElementById('unfinished');
    const finished = document.getElementById('finished');
  
    finished.innerHTML = '';
    unfinished.innerHTML = '';
  
    for (const bookItem of books) {
        const bookElement = makeBookItem(bookItem);

        if (bookItem.isCompleted) {
            finished.append(bookElement);
        } else {
            unfinished.append(bookElement);
        }
    }
})