import React, { useState } from 'react';
import './fileUploader.css'
import TextAreaComponent from './TextAreaComponent';
import TerrainDataComponent from './terrainDataComponent'
import InternalValuesComponent from './internalValuesComponent';
import SubdivisionLevel from './subdivisionLevelComponent';
import StringInputComponent from './stringInputComponent';
import { useNavigate } from "react-router-dom";

function FileUploader() {
  const [sceneName, setSceneName] = useState('');
  const [file, setFile] = useState(null);
  const [subdivisionLevel, setSubdivisionLevel] = useState('');
  const [description, setDescription] = useState('');
  const [rows, setRows] = useState([{ start: '', end: '', color: '#000000' }]);
  const [finalBigTerrainData, setFinalBigTerrainData] = useState([{dim_x_y_z: '', points_per_dimension: '', max_spheres: ''}]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!sceneName || !file || !subdivisionLevel || !description || !finalBigTerrainData || !rows) {
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
      "dim_x_y_z": ${finalBigTerrainData.dim_x_y_z},
      "block_width": ${finalBigTerrainData.points_per_dimension},
      "points_per_dimention": ${finalBigTerrainData.points_per_dimension},
      "max_spheres": "10"
    }`);
    formData.append("final_big_terrain_data", `{
      "dim_x_y_z": ${finalBigTerrainData.dim_x_y_z},
      "block_width": ${finalBigTerrainData.points_per_dimension},
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
        alert('El modelo se cargó de forma correcta!');
        navigate('/models');
      } else {
        alert('Falló la carga del modelo');
      }
    } catch (error) {
      console.error("Hubo un error mientras se estaba cargando el modelo:", error);
      alert('Hubo un error mientra se estaba cargando el modelo');
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
      <StringInputComponent headValue={"Nombre de la escena"} placeholderInput={"Nombre"} value={sceneName} setValue={setSceneName} />
      <InternalValuesComponent rows={rows} handleInputChange={handleInputChange} addRow={addRow} removeRow={removeRow}/>
      <TerrainDataComponent data={finalBigTerrainData} headline={'Datos de contrucción de la escena'} handleChange={handleFinalBigTerrainDataChange}/>
      <SubdivisionLevel value={subdivisionLevel} setValue={setSubdivisionLevel} />
      <TextAreaComponent text={description} headValue={"Descripción"} handleTextChange={handleDescriptionChange} />
      <div>
            <h5>Cargar archivo</h5>
            <input type="file" onChange={handleFileChange} />
        </div>
      <div className='form-button'>
        <button onClick={handleUpload}>Cargar modelo</button>
      </div>
    </div>
  );
}

export default FileUploader;
