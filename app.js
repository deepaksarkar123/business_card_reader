document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onloadend = function() {
          // Extract the base64-encoded image data
          const base64Image = reader.result.split(',')[1];
          sendToPowerAutomate(base64Image);
      };
      reader.readAsDataURL(file);
  }
});

function sendToPowerAutomate(imageBase64) {
  const httpPostUrl = 'https://prod-247.westeurope.logic.azure.com:443/workflows/6c5c1a6b22d547b2a157d2ac9f14777f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OVHkqK5GPNebdRkOWa_AeCdRgdA7LbZkLpKiPGZAiKM';
  
  const data = {
      image: imageBase64
  };

  fetch(httpPostUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      document.getElementById('infoForm').style.display = 'block';
      document.getElementById('firstName').value = data.FirstName || '';
      document.getElementById('lastName').value = data.LastName || '';
      document.getElementById('email').value = data.Email || '';
      document.getElementById('companyName').value = data.CompanyName || '';
      document.getElementById('mobile').value = data.Mobile || '';
      alert('Image uploaded and processed successfully!');
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Failed to upload and process the image.');
  });
}
