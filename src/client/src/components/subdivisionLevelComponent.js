import React from "react";

function SubdivisionLevel ({value, setValue}) {

    return (
        <div>
            <h5>Cantidad de subdivisiones que se quiere hacer al cubo</h5>
            <input 
            type="number" 
            placeholder="Ingrese un número" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            min={0}
            step={1}
            /> <t style={{fontSize:"10px"}}>
            *El número ingresado debe ser potencia de 2*
            </t>
        </div>
    )
}

export default SubdivisionLevel;