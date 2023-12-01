const fileInput = document.getElementById('csvFileInput');

fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('csvFile', file);

    fetch('http://localhost:3000/api/sendfile', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('File uploaded successfully.');
        // Additional actions upon successful file upload can be added here
      } else {
        console.error('File upload failed.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
