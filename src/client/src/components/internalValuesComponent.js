import React from "react";

function InternalValuesComponent({rows, handleInputChange, addRow, removeRow}) {
    return (
        <div>
        <h5>Internal Values</h5>
        {rows.map((row, index) => (
            <div key={index}>
                <input className="form-input"
                    type="number"
                    placeholder="Start"
                    value={row.start}
                    onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                    step="0.00001"
                    min="0"
                />
                <input className="form-input"
                    type="number"
                    placeholder="End"
                    value={row.end}
                    onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                    step="0.00001"
                    min="0"
                />
                <input className="form-input"
                    type="color"
                    value={row.color}
                    onChange={(e) => handleInputChange(index, 'color', e.target.value)}
                />
            </div>
        ))}
        <button onClick={addRow}>Add Row</button>
        <button onClick={removeRow}>Remove Row</button>
      </div>
    );
}

export default InternalValuesComponent;