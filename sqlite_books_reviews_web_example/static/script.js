// Array to store book data
const books = [];

// Function to add a book to the list and send it to the server

function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const publicationYear = document.getElementById('publicationYear').value;
    const authorName = document.getElementById('authorName').value; // Get author name

    // Create a JSON object with book data
    const bookData = {
        title: bookTitle,
        publication_year: publicationYear,
        author: authorName // Add author name to book data
    };

    // Send the book data to the server via POST request
    fetch('/api/add_book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);

            // Add the new book data to the books array
            books.push(bookData);
            console.log(books);

            // Refresh the book list
            displayBooks();
        })
        .catch(error => {
            console.error('Error adding book:', error);
        });
}

// Function to display books in the list
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear existing book list

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h2>Added Successfully: ${book.title}</h2>
            <p>Publication Year: ${book.publication_year}</p>
            <p>Author: ${book.author}</p> <!-- Display author name -->
        `;
        bookList.appendChild(bookElement);
    });
}

// Modify the showAllBooks function to include author information
function showAllBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('allbooks');
            bookList.innerHTML = ''; // Clear existing book list
            console.log(data);
            data.books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.innerHTML = `
                    <h2>${book.title}</h2>
                    <p>Publication Year: ${book.publication_year}</p>
                    <p>Author: ${book.author}</p> <!-- Display author name -->
                `;
                bookList.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Error fetching all books:', error);
        });
}
