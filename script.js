const mainContainer = document.querySelector(".mainContainer");
const bookList = document.querySelector(".bookList");
const card = document.querySelector(".card");
const newBook = document.querySelector("#newBook");

const newForm = document.getElementById("newForm");
const editForm = document.getElementById("editForm");

const cancelNewFormButton = document.querySelector("#cancel");
const submitNewFormButton = document.querySelector("#submitForm");

const cancelEditFormButton = document.querySelector("#cancelEdit");
const submitEditFormButton = document.querySelector("#submitEdit");

const deletePopUp = document.querySelector("#deletePopUp");
const confirmDeleteButton = document.querySelector("#confirmDelete");
const cancelDeleteButton = document.querySelector("#cancelDelete");

let myLibrary = [];
let isFormOpen = false;
let isMenuOpen = false;

const exampleBook1 = new Book('Example Book 1', 'A.B. CDEF', '250', 'Completed');
addBookToLibrary(exampleBook1);

const bookTwo = new Book('The Book 2', 'A.B.C. DEF', '320', 'Planning');
addBookToLibrary(bookTwo);

const bookThree = new Book('The Book 3', 'D.E.F. GHI', '550', 'Reading');
addBookToLibrary(bookThree);

newBook.onclick = openNewForm;

submitNewFormButton.onclick = submitForm;
cancelNewFormButton.onclick = cancelNewForm;
cancelEditFormButton.onclick = cancelEditForm;
cancelDeleteButton.onclick = cancelDeletion;

//close forms or menus on clicking outside them
document.addEventListener('click', function(e) {
    const target = e.target;
    if (target !== newBook && isFormOpen == true && target == newForm)
    {
        cancelNewForm(e);
    }
    else if (isFormOpen == true && target == editForm)
    {
        cancelEditForm(e);
    }
    else if (isFormOpen == true && target == deletePopUp)
    {
        cancelDeletion(e);
    }
    const menus = document.querySelectorAll(".menu");
    menus.forEach(function(menu) {
        if (!menu.contains(target) || !target.classList.contains("menuButton")) {
            menu.classList.remove("menuStyle");
            menu.style.visibility = 'hidden';
            isMenuOpen = false;
        }
    });
});

//book object
function Book(title, author, pages, status)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function openNewForm() {
    newForm.style.display = "block";
    isFormOpen = true;
}

function cancelNewForm(e) {
    newForm.reset();
    newForm.style.display = "none";
    isFormOpen = false;
    e.preventDefault();
}

function cancelEditForm(e) {
    editForm.reset();
    editForm.style.display = "none";
    isFormOpen = false;
    e.preventDefault();
}

function cancelDeletion(e) {
    deletePopUp.style.display = "none";
    isFormOpen = false;
    e.preventDefault();
}

//add new book using form
function submitForm(e) {
    if(newForm.checkValidity())
    {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let status = document.querySelector("#status").value;
    
        book = new Book (title, author, pages, status);
        addBookToLibrary(book);
    
        isFormOpen = false;
        newForm.reset();
        newForm.style.display = "none";
    }
    else 
    {
        newForm.reportValidity();
    }
    e.preventDefault();
}

//edit existing book using form
function submitEditForm(bookToEdit, cardToEdit, titleBox, authorBox, pageBox, statusBox, event) {
    
    let i = bookToEdit;

    if(editForm.checkValidity())
    {
        myLibrary[i].title = document.querySelector("#editedTitle").value;
        myLibrary[i].author = document.querySelector("#editedAuthor").value;
        myLibrary[i].pages = document.querySelector("#editedPages").value;
        myLibrary[i].status = document.querySelector("#editedStatus").value;
    
        titleBox.textContent = myLibrary[i].title;
        cardToEdit.setAttribute("data-title", myLibrary[i].title);
        authorBox.textContent = myLibrary[i].author;
        pageBox.textContent = myLibrary[i].pages;
        statusBox.textContent = myLibrary[i].status;

        isFormOpen = false;
        editForm.reset();
        editForm.style.display = "none";
    }
    else
    {
        editForm.reportValidity();
    }
    event.preventDefault();
}

//create new card
function createCard() {
    newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');

    titleBox = document.createElement('p');
    titleBox.setAttribute('class', 'titleText');
    newCard.append(titleBox);

    authorBox = document.createElement('p');
    authorBox.setAttribute('class', 'authorText');
    newCard.append(authorBox);

    pageBox = document.createElement('p');
    pageBox.setAttribute('class', 'pageText');
    newCard.append(pageBox);

    statusBox = document.createElement('p');
    statusBox.setAttribute('class', 'statusText');
    newCard.append(statusBox);

    menuButton = createMenuButton();
    newCard.append(menuButton);

    return newCard;
}

function showDeletePopUp(cardToDelete) {
    
    deletePopUp.style.display = "block";
    isFormOpen = true;

    let menu = cardToDelete.querySelector(".menu");
    menu.style.visibility = 'hidden';

    confirmDeleteButton.onclick = function(event) {
        deleteCard(cardToDelete, event);
    };
}

function deleteCard(cardToDelete, event) {
    
    cardToDelete.remove();
    for (let i = 0; i < myLibrary.length; i++)
    {
        //remove book from myLibrary
        if ( myLibrary[i].title == cardToDelete.getAttribute("data-title") )
        {
            myLibrary.splice(i, 1);
        }
    }
    isFormOpen = false;
    deletePopUp.style.display = "none";
    event.preventDefault();
}

//edit existing card
function editCard(menuOfCard) {

    let cardToEdit = menuOfCard;
    editForm.style.display = "block";
    isFormOpen = true;

    let menu = cardToEdit.querySelector(".menu");
    menu.style.visibility = 'hidden'

    let titleBox = cardToEdit.querySelector(".titleText");
    let authorBox = cardToEdit.querySelector(".authorText");
    let pageBox = cardToEdit.querySelector(".pageText");
    let statusBox = cardToEdit.querySelector(".statusText");

    document.querySelector("#editedTitle").value = titleBox.textContent;
    document.querySelector("#editedAuthor").value = authorBox.textContent;
    document.querySelector("#editedPages").value = pageBox.textContent;
    document.querySelector("#editedStatus").value = statusBox.textContent;

    for (let i = 0; i < myLibrary.length; i++)
    {
        //get the book to edit from myLibrary
        if ( myLibrary[i].title == cardToEdit.getAttribute("data-title") )
        {
            bookToEdit = i;
        }
    }

    //open form to edit selected book
    submitEditFormButton.onclick = function(event) {
        submitEditForm(bookToEdit, cardToEdit, titleBox, authorBox, pageBox, statusBox, event);
    };
}

//create menu button for card
function createMenuButton() {

    menuButton = document.createElement('div');
    menuButton.setAttribute('class', 'menuButton');

    menuDotsContainer = document.createElement('div');
    menuDotsContainer.setAttribute('class', 'menuDotsContainer')
    menuButton.append(menuDotsContainer);

    for (let i = 0; i < 3; i++) {
        const menuDot = document.createElement('div');
        menuDot.setAttribute('class', 'menuDot');
        menuDotsContainer.append(menuDot);
    }

    menu = document.createElement('div');
    menu.setAttribute('class', 'menu');
    menuButton.append(menu);

    deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute('class', 'deleteButton');

    editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.setAttribute('class', 'editButton');
    
    menu.append(editButton, deleteButton); 
    return menuButton;
}

//show respective menu on clicking button
function showMenu(menuOfCard, event) {

    let target = event.target;
    if (isMenuOpen == true) //if a menu is already open
    {
        const menus = document.querySelectorAll(".menu");
        menus.forEach(function(menu) {
            if (!menu.contains(target) || !target.classList.contains("menuButton")) {
                menu.classList.remove("menuStyle");
                menu.style.visibility = 'hidden';
            }
        });

        //show newly selected menu after hiding previously visible menu
        setTimeout(() => {  
            const menu = menuOfCard.querySelector('.menu');
            menu.classList.add("menuStyle");
            menu.style.visibility = 'visible';
            isMenuOpen = true;
        }, 5);
    }
    else
    {
        const menu = menuOfCard.querySelector('.menu');
        menu.classList.add("menuStyle");
        menu.style.visibility = 'visible';
        isMenuOpen = true;
    }
}

function addBookToLibrary(book) {
    newCard = createCard();
    newCard.setAttribute("data-title", book.title);
    editButton.setAttribute("data-title", book.title);
    
    let cardToDelete = newCard;
    deleteButton.addEventListener("click", function (event) {
        showDeletePopUp(cardToDelete);
        event.stopPropagation();
    });

    let menuOfCard = newCard;
    menuButton.addEventListener("click", function (event) {
        showMenu(menuOfCard, event);
        event.stopPropagation();
    });

    editButton.addEventListener("click", function (event) {
        editCard(menuOfCard);
        event.stopPropagation();
    });

    titleBox.textContent = book.title;
    authorBox.textContent = book.author;
    pageBox.textContent = book.pages;
    statusBox.textContent = book.status;

    bookList.append(newCard);
    myLibrary.push(book);
}