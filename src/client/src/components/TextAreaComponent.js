import React from 'react';
import './textAreaComponent.css';

function TextAreaComponent({ text, headValue, handleTextChange }) { // props destructuring
    return (
        <div className="textarea-container">
            <div>
                <div>
                <h5 style={{fontSize:"15px"}}>{headValue}</h5>
                </div>
                <textarea 
                    id="customTextarea"
                    value={text} 
                    onChange={handleTextChange} 
                    rows="10" 
                    cols="50" 
                    placeholder="Escriba su descripción aquí..."
                ></textarea>
            </div>
        </div>
    );
}

export default TextAreaComponent;
