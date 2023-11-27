
// Placeholder middleware function
const errorHandling = (err, req, res, next) => {
    // Placeholder error handling logic
    console.error(err);
    res.status(500).send('Something went wrong.');
  };
  
  module.exports = errorHandling;
  