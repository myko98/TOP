function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    const isRead = read ? "read" : "not read yet";
    // console.log(
    //   `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}`
    // );
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}`;
  };
}

const naruto = new Book("Naruto", "Kishimoto", "50", false);

console.log(naruto.info());
