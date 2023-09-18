import React from "react";

function StringInput ({headValue, value, setValue}) {

    return (
        <div>
            <h5>{headValue}</h5>
            <input 
            type="string" 
            placeholder="Enter String" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default StringInput;