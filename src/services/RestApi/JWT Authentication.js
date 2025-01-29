// Question:
// Add a login endpoint (POST /login) that generates a JWT token, and protect the POST /books endpoint so only authenticated users can access it.
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

// Dummy user for authentication
const user = { username: 'admin', password: 'password' };

// POST /login - Generate JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied');
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
}

// Protected POST /books
app.post('/books', authenticateToken, (req, res) => {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});
