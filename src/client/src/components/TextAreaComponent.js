import React from 'react';
import './textAreaComponent.css';

function TextAreaComponent({ text, label, handleTextChange }) { // props destructuring
    return (
        <div className="textarea-container">
            <label htmlFor="customTextarea">{label}:</label>
            <textarea 
                id="customTextarea"
                value={text} 
                onChange={handleTextChange} 
                rows="10" 
                cols="50" 
                placeholder="Type your description here..."
            ></textarea>
        </div>
    );
}

export default TextAreaComponent;
