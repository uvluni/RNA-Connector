const express = require('express');
const app = express();
const multer = require('multer'); // Librery for file upload
const { sendFile, getLocations } = require('./fileHandler');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const date = new Date();
      const formattedDate = `${('0' + date.getDate()).slice(-2)}_${('0' + (date.getMonth() + 1)).slice(-2)}_${date.getFullYear()}-${('0' + date.getHours()).slice(-2)}_${('0' + date.getMinutes()).slice(-2)}`;
      const fileName = file.originalname.split('.')[0];
      const fileExtension = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, `${fileName}-${formattedDate}${fileExtension}`);
    }
  })
});

// Handle CORS if your frontend and backend are on different origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to handle file upload
app.post('/api/sendfile', upload.single('csvFile'), sendFile);

// Route to handle GET Locations
app.get('/api/getLocations', getLocations)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
