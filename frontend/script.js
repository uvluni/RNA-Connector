const fileInput = document.getElementById('csvFileInput');
const datePicker = document.getElementById('sessionDatePicker');
const showStopLevelCheckbox = document.getElementById('showStopLevel');
const submitButton = document.getElementById('submitButton');

fileInput.addEventListener('change', function() {
  // Existing file upload logic
});

datePicker.addEventListener('change', function() {
  // Existing date picker logic
});

submitButton.addEventListener('click', function() {
  const selectedDate = datePicker.value;
  const apiUrl = showStopLevelCheckbox.checked
    ? `http://localhost:3000/api/getStopsRoutes?sessionDate=${selectedDate}`
    : `http://localhost:3000/api/getRoutes?sessionDate=${selectedDate}`;

  fetch(apiUrl)
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
