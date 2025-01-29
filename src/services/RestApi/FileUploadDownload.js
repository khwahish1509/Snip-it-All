// Question:
// Create endpoints to upload and download files:

// POST /upload: Upload a file.
// GET /files/:filename: Download a file.


const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

// POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file });
});

// GET /files/:filename
app.get('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});
