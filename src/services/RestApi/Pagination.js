// Question:
// Modify the GET /books endpoint to support pagination with page and limit query parameters.


// GET all books with pagination
app.get('/books', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);
    res.json(paginatedBooks);
});
