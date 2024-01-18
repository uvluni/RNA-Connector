const fileInput = document.getElementById('csvFileInput');
const datePicker = document.getElementById('sessionDatePicker');
const submitButton = document.getElementById('submitButton');

fileInput.addEventListener('change', function() {
  // Existing file upload logic
});

datePicker.addEventListener('change', function() {
  // Existing date picker logic
});

submitButton.addEventListener('click', function() {
  const selectedDate = datePicker.value;

  fetch(`http://localhost:3000/api/getRoutes?sessionDate=${selectedDate}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch routes.');
      }
    })
    .then(data => {
      console.log('Routes for the selected date:', data);
      // Handle the routes data as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
