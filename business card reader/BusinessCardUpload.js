import React, { useState } from 'react';

const BusinessCardUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadCard = async () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        
        const url = 'https://prod-247.westeurope.logic.azure.com:443/workflows/6c5c1a6b22d547b2a157d2ac9f14777f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OVHkqK5GPNebdRkOWa_AeCdRgdA7LbZkLpKiPGZAiKM';
        const method = 'POST';
        const headers = {
          'Content-Type': 'application/json',
          // Additional headers if needed
        };
        const body = JSON.stringify({
          fileContent: base64,
          fileName: file.name
        });

        try {
          const response = await fetch(url, { method, headers, body });
          const data = await response.json();
          
          console.log(data);
          alert('Upload successful!');
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Upload failed. Please try again.');
        }
      };
      reader.onerror = error => console.log('Error reading file:', error);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div>
      <h2>Upload Business Card</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={uploadCard}>Upload</button>
    </div>
  );
};

export default BusinessCardUpload;
