let myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    if(this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const lolita = new Book('Lolita', 'Nabokov', true);
const karenina = new Book('Anna Karenina', 'Tolstoy', true);
const war = new Book('War and Peace', 'Tolstoy', false);

myLibrary.push(lolita);
myLibrary.push(karenina);
myLibrary.push(war);

// ---------- EVENT LISTENERS ---------- //

const openModal = document.getElementById('modal-open');
const modal = document.getElementById('modal_container');
const closeModal = document.getElementById('modal-close');
const modalContainer = document.getElementById('modal_container');
const addBook = document.getElementById('modal-submit');
const clearAll = document.getElementById('modal-clear');

openModal.addEventListener('click', () => {
    modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modalContainer.addEventListener('click', (e) => {
    if(e.target.id == 'modal_container') {
        modal.classList.remove('show');
    }
});

addBook.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let read = document.getElementById('read').checked;

    // Build book object
    let userBook = new Book(title, author, read);
    myLibrary.push(userBook);
    updateCards();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('read').checked = false;
    modal.classList.remove('show');
});

clearAll.addEventListener('click', () => {
    myLibrary = [];
    updateCards();
});

function updateCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const newCard = document.createElement('div')
        newCard.id = 'card';

        const title = document.createElement('p');
        const titleText = document.createTextNode(book.title);
        title.append(titleText);

        const author = document.createElement('p');
        const authorText = document.createTextNode(book.author);
        author.append(authorText);

        const read = document.createElement('p');
        read.classList.add('read-status');
        let readStatus = 'Not read 📖';
        if(book.read) readStatus = 'Read 📘';
        const readValue = document.createTextNode(readStatus);
        read.append(readValue);

        newCard.append(title);
        newCard.append(author);
        newCard.append(read);

        const readBtn = document.createElement('input');
        readBtn.type = 'button';
        readBtn.name = 'read-btn';
        readBtn.classList.add('read-btn');
        readBtn.value = 'Mark read 😌';
        if(book.read) readBtn.value = 'Mark unread 🤓';

        readBtn.addEventListener('click', (e) => {
            let changeCard = document.querySelector(`[data-index="${index}"`)
            let readText = changeCard.querySelector('.read-status');
            let readButton = changeCard.querySelector('.read-btn');
            readText.innerHTML = 'test';

            if(book.read){
                readText.innerHTML = 'Not read 📖';
                book.read = false;
                readButton.value = 'Mark read 😌';
            } else {
                readText.innerHTML = 'Read 📘';
                book.read = true;
                readButton.value = 'Mark unread 🤓';
            }
        })

        const removeBtn = document.createElement('input');
        removeBtn.type = 'button';
        removeBtn.name = 'remove-btn';
        removeBtn.id = 'remove-btn';
        removeBtn.value = 'Remove book ❌';

        newCard.append(readBtn);
        newCard.append(removeBtn);

        newCard.classList.add('card');
        newCard.setAttribute('data-index', index); //Set book index to data attribute

        cardContainer.appendChild(newCard);

        removeBtn.addEventListener('click', (e) => {  
            if(myLibrary.length == 1) {
                myLibrary = [];
            } else {
                myLibrary.splice(index, 1);
            }
            updateCards();
        });
    });
}

updateCards();