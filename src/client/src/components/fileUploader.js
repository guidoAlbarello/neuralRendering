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

    formData.append("internal_values","0.0,0.5|0.5,0.8|0.8,1.0|1.0,1.5")
    formData.append("colors","0,1.0,0.9372559|0.78039215686274,0.917647,0.2745|0.98431372549,0.98431372549,0.58|0.6235294117647,0.5,0.4392156862745")
    formData.append("big_terrain_data",{
      "dim_x_y_z": 1,
      "block_width": 64.0,
      "points_per_dimention": 64.0,
      "max_spheres": 100
    })
    formData.append("final_big_terrain_data", {
        "dim_x_y_z": 1,
        "block_width": 64.0,
        "points_per_dimention": 64.0,
        "max_spheres": 100
      })
      
      formData.append("subdivision_level", 1)

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload))
    //formData.append('file', file);
    formData.append('name', name);
    // formData.append('number', number);
    
    try {
      const response = await fetch('http://localhost:8000/scenes', {
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
