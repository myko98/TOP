let myLibrary = [];
const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const listOfGridBooks = document.querySelector('.grid');
const formButton = document.querySelector('.formButton');
const dialog = document.querySelector('dialog');
const dialogCloseButton = document.querySelector('dialog button');

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info() {
		const isRead = read ? 'read' : 'not read yet';
		// console.log(
		//   `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}`
		// );
		return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}`;
	}

	toggleRead() {
		this.read = !this.read;
	}
}

function addBook(event) {
	event.preventDefault();
	// If author, title and pages aren't filled, open modal
	if (!(author.value && title.value && pages.value)) {
		console.log('please fill out form');
		// TODO: display error message in modal
		dialog.showModal();
		dialogCloseButton.addEventListener('click', () => {
			dialog.close();
		});
		return;
	}

	const newAuthor = author.value;
	const newTitle = title.value;
	const newPages = pages.value;
	const newRead = read.checked;
	const newBook = new Book(newTitle, newAuthor, newPages, newRead);
	myLibrary.push(newBook);

	// Clear form
	author.value = '';
	title.value = '';
	pages.value = 0;
	read.checked = false;

	// Focus back onto Author input after successfully adding a book
	author.focus();

	refreshLibrary();
}

function deleteBook(e) {
	const deleteBookIndex = parseInt(e.target.parentNode.dataset.bookIndex);
	myLibrary = myLibrary.filter((book, i) => i !== deleteBookIndex);
	console.log(myLibrary);
	refreshLibrary();
}

function refreshLibrary() {
	// First delete all books
	console.log('refreshing');
	let child = listOfGridBooks.lastElementChild;
	while (child) {
		listOfGridBooks.removeChild(child);
		child = listOfGridBooks.lastElementChild;
	}

	// Then read all books
	for (let i = 0; i < myLibrary.length; i++) {
		const book = createBookGrid(myLibrary[i]);

		// set data-book-index to i
		book.dataset.bookIndex = i;
		listOfGridBooks.appendChild(book);
	}
}

function createBookGrid(book) {
	const bookGrid = document.createElement('div');
	const title = document.createElement('h3');
	const author = document.createElement('p');
	const pages = document.createElement('p');
	const deleteButton = document.createElement('button');

	const toggleReadLabel = document.createElement('label');
	const bookReadId = `${book.title}-read`;
	const toggleRead = document.createElement('input');

	bookGrid.className = 'bookGrid';

	// Set up read checkbox
	toggleReadLabel.textContent = 'Read: ';
	toggleReadLabel.setAttribute('for', bookReadId);
	toggleRead.type = 'checkbox';
	toggleRead.addEventListener('change', () => {
		book.toggleRead();
	});
	toggleRead.setAttribute('id', bookReadId);
	toggleRead.textContent = 'Read: ';
	toggleReadLabel.append(toggleRead);

	// Set up title, author, num pages
	title.textContent = 'Title: ' + book.title;
	author.textContent = 'Author: ' + book.author;
	pages.textContent = 'Number of pages: ' + book.pages;

	// Set up delete button
	deleteButton.textContent = 'delete';
	deleteButton.addEventListener('click', deleteBook);

	bookGrid.append(title, author, pages, toggleReadLabel, deleteButton);
	return bookGrid;
}

formButton.addEventListener('click', addBook);
