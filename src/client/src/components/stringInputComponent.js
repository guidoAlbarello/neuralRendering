import React from "react";

function StringInput ({headValue, placeholderInput, value, setValue}) {

    return (
        <div>
            <h5>{headValue}</h5>
            <input 
            type="string" 
            placeholder={placeholderInput}
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default StringInput;