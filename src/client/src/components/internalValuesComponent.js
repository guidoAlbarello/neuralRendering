import React from "react";

function InternalValuesComponent({rows, handleInputChange, addRow, removeRow}) {
    return (
        <div>
        <h5 style={{fontSize:"15px"}}>Intervalos de densidades que conforman un material</h5>
        {rows.map((row, index) => (
            <div key={index}>
                <input className="form-input"
                    type="number"
                    placeholder="Comienza en..."
                    value={row.start}
                    onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                    step="0.00001"
                    min="0"
                />
                <input className="form-input"
                    type="number"
                    placeholder="Termina en..."
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
        <button onClick={addRow}>Agregar otro material</button>
        <button onClick={removeRow}>Eliminar el último material</button>
      </div>
    );
}

export default InternalValuesComponent;