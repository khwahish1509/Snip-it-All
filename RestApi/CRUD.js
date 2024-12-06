// Question:
// // Create a RESTful API using Node.js and Express to manage a collection of books. Include the following endpoints:

// // GET /books: Retrieve all books
// // POST /books: Add a new book
// // GET /books/:id: Retrieve a book by ID
// // PUT /books/:id: Update a book by ID
// // DELETE /books/:id: Delete a book by ID

const express = require('express');
const app = express();

app.use(express.json());

let books = []; // Array to store books

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});

// GET a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    Object.assign(book, req.body);
    res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');
    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
