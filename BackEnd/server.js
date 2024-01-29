const express = require('express');
const { getLocations } = require('./routes/locationHandler');
const { getRoutes } = require('./routes/routesHandler');
const { getStopsRoutes } = require('./routes/routesStopsHandler');
const { getOrders } = require('./routes/ordersHandler');
const { addLocationsProcess } = require('./routes/addLocations');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure Multer

const app = express();

// Handle CORS if your frontend and backend are on different origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to handle file upload
app.post('/api/sendfile', upload.single('csvFile'), addLocationsProcess);

app.get('/api/getLocations', getLocations);

app.get('/api/getRoutes', getRoutes);

app.get('/api/getStopsRoutes', getStopsRoutes);

app.get('/api/getOrders', getOrders);

const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
