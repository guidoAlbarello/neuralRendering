import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [inputList, setInputList] = useState([{ value: "" }]);

  // Handle input change event
  const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
  };

  // Handle the click event of the Add button
  const handleAddInput = () => {
      setInputList([...inputList, { value: "" }]);
  };

  // Handle the click event of the Remove button
  const handleRemoveInput = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
  };

  const handleUpload = async () => {
    if (!file || !name || !number) {
      alert("Please fill out all fields and select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    formData.append("internal_values","0,1")
    formData.append("colors","0,1.0,1.0")
    formData.append("big_terrain_data",`{
      "dim_x_y_z": ${1},
      "block_width": ${64.0},
      "points_per_dimention": ${64.0},
      "max_spheres": 100
    }`)
    formData.append("final_big_terrain_data", `{
        "dim_x_y_z": 1,
        "block_width": ${64.0},
        "points_per_dimention": ${64.0},
        "max_spheres": 100
      }`)
      
    formData.append("subdivision_level", 1)
    formData.append("description","lalalalala")
    
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
          placeholder="RGB color" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button onClick={(e) => console.log(e)}>+</button>
        <button onClick={(e) => console.log(e)}>-</button>

        {inputList.map((inputField, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="value"
                        value={inputField.value}
                        onChange={e => handleInputChange(e, index)}
                    />
                    {inputList.length !== 1 && (
                        <button onClick={() => handleRemoveInput(index)}>-</button>
                    )}
                    {inputList.length - 1 === index && (
                        <button onClick={handleAddInput}>+</button>
                    )}
                </div>
            ))}
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
