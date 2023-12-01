const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for file uploads

// Handle CORS if your frontend and backend are on different origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to handle file upload
app.post('/api/sendfile', upload.single('csvFile'), (req, res) => {
  // Access the uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Perform actions with the uploaded file here

  res.status(200).send('File uploaded successfully.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
