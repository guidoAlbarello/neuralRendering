import React, { useState } from 'react';
import './fileUploader.css'
import TextAreaComponent from './TextAreaComponent';
import TerrainDataComponent from './terrainDataComponent'
import InternalValuesComponent from './internalValuesComponent';
import SubdivisionLevel from './subdivisionLevelComponent';
import StringInputComponent from './stringInputComponent';

function FileUploader() {
  const [sceneName, setSceneName] = useState('');
  const [file, setFile] = useState(null);
  const [subdivisionLevel, setSubdivisionLevel] = useState('');
  const [description, setDescription] = useState('');
  const [rows, setRows] = useState([{ start: '', end: '', color: '#000000' }]);
  const [bigTerrainData, setBigTerrainData] = useState([{dim_x_y_z: '', block_width: '', points_per_dimension: '', max_spheres: ''}]);
  const [finalBigTerrainData, setFinalBigTerrainData] = useState([{dim_x_y_z: '', block_width: '', points_per_dimension: '', max_spheres: ''}]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!sceneName || !file || !subdivisionLevel || !description || !bigTerrainData || !finalBigTerrainData || !rows) {
      alert("Please fill out all fields and select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', sceneName);
    formData.append('internal_values', rows.map(row => `${row.start},${row.end}`).join('|'));
    formData.append('colors', rows.map(row => hexToRGBFloat(row.color)).join('|'));
    // console.log(bigTerrainData);
    formData.append("big_terrain_data",`{
      "dim_x_y_z": ${bigTerrainData.dim_x_y_z},
      "block_width": ${bigTerrainData.block_width},
      "points_per_dimention": ${bigTerrainData.points_per_dimension},
      "max_spheres": ${bigTerrainData.max_spheres}
    }`);
    formData.append("final_big_terrain_data", `{
      "dim_x_y_z": ${finalBigTerrainData.dim_x_y_z},
      "block_width": ${finalBigTerrainData.block_width},
      "points_per_dimention": ${finalBigTerrainData.points_per_dimension},
      "max_spheres": ${finalBigTerrainData.max_spheres}
      }`);
    formData.append("subdivision_level", subdivisionLevel);
    formData.append("description", description);
    
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

  const handleInputChange = (index, field, value) => {
      const updatedRows = [...rows];
      updatedRows[index][field] = value;
      setRows(updatedRows);
  };

  const addRow = () => {
      setRows([...rows, { start: '', end: '', color: '#000000' }]);
  };

  const removeRow = () => {
      if (rows.length > 1) {
          const updatedRows = [...rows];
          updatedRows.pop();
          setRows(updatedRows);
      }
  };

  const handleBigTerrainDataChange = (fieldName, value) => {
    setBigTerrainData(values => ({...values, [fieldName]: value}))
  };

  const handleFinalBigTerrainDataChange = (fieldName, value) => {
    setFinalBigTerrainData(values => ({...values, [fieldName]: value}))
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  function hexToRGBFloat(hex) {
    hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r / 255.0, g / 255.0, b / 255.0];
  }

  return (
    <div>
      <StringInputComponent headValue={"Scene name"} value={sceneName} setValue={setSceneName} />
      <InternalValuesComponent rows={rows} handleInputChange={handleInputChange} addRow={addRow} removeRow={removeRow}/>
      <TerrainDataComponent data={bigTerrainData} headline={'Big Terrain Data'} handleChange={handleBigTerrainDataChange}/>
      <TerrainDataComponent data={finalBigTerrainData} headline={'Final Big Terrain Data'} handleChange={handleFinalBigTerrainDataChange}/>
      <SubdivisionLevel value={subdivisionLevel} setValue={setSubdivisionLevel} />
      <TextAreaComponent text={description} label="Description" handleTextChange={handleDescriptionChange} />
      <div>
            <label>Add file</label>
            <input type="file" onChange={handleFileChange} />
        </div>
      <div className='form-button'>
        <button onClick={handleUpload}>Upload model</button>
      </div>
    </div>
  );
}

export default FileUploader;
