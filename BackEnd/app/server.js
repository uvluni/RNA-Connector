// Initializes the server, connects middleware, and link routes to the application.

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for parsing JSON and handling URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require routes and use them in the application
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

// Include the authentication route
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);



// Your main file (e.g., server.js or any other script)
const getDailyplanRoutesFromAPI = require('./utils/getDailyplanRoutesFromAPI');

// Assuming you have obtained the authentication token
const authToken = 'YOUR_RECEIVED_TOKEN'; // Replace with your received token

// Error handling middleware - handle 404 and other errors
const errorHandling = require('./middlewares/errorHandling');
app.use(errorHandling);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


