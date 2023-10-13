import React from 'react';
import FileUploader from '../components/fileUploader';
import './Uploader.css';

const Uploader = () => {
    return (
        <div className="form-container">
            <h1>Cargar un nuevo modelo</h1>
            <FileUploader />
        </div>
    );
}

export default Uploader;