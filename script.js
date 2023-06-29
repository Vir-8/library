const mainContainer = document.querySelector(".mainContainer");
const card = document.querySelector(".card");
const newBook = document.querySelector("#newBook");
const cancel = document.querySelector("#cancel");
const submit = document.querySelector("#submitForm");

let myLibrary = [];

newBook.addEventListener('click', openForm);
cancel.addEventListener('click', closeForm);
submit.addEventListener('click', submitForm)

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function submitForm(e) {
    newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    mainContainer.append(newCard);

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    if (document.querySelector("#status").value == "on")
    {
        read = true;
    }
    else
    {
        read = false;
    }

    book = new Book (title, author, pages, read);
    myLibrary.push(book);

    newCard.textContent = book.info();

    document.getElementById("popupForm").style.display = "none";
    e.preventDefault();
}

function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        if (read == true)
        {
            return title + " by " + author + ", " + pages + " pages, read.";  
        }
        else if (read == false)
        {
            return title + " by " + author + ", " + pages + " pages, not read yet.";
        }
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary(theHobbit);

const Abc = new Book('ABC', 'D. E. F', '35', true);
addBookToLibrary(Abc);

const ADEF = new Book('AEWHRHEC', 'D.EEEE. F', '353', false);
addBookToLibrary(ADEF);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

for (let i = 0; i < myLibrary.length; i++)
{
    newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    newCard.textContent = myLibrary[i].info();

    mainContainer.append(newCard);
}