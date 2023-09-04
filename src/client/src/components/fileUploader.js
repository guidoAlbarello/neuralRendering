import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !name || !number) {
      alert("Please fill out all fields and select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('number', number);

    try {
      const response = await fetch('http://localhost:8888/api/v1/models', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Data uploaded successfully');
      } else {
        alert('Failed to upload data');
      }
    } catch (error) {
      console.error("There was an error uploading the data:", error);
      alert('Error uploading data');
    }
  };

  return (
    <div>
      <div>
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="number" 
          placeholder="Enter Number" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
        />
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default FileUploader;
