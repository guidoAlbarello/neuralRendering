import React from "react";

function SubdivisionLevel ({value, setValue}) {

    return (
        <div>
            <h5>Subdivision level</h5>
            <input 
            type="number" 
            placeholder="Enter a number" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            min={0}
            step={1}
            />
        </div>
    )
}

export default SubdivisionLevel;