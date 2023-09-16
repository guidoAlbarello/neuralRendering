import React from 'react';
import FileUploader from '../components/fileUploader';
import './Uploader.css';

const Uploader = () => {
    return (
        <div className="form-container">
            <h1>Upload new model</h1>
            <FileUploader />
        </div>
    );
}

export default Uploader;