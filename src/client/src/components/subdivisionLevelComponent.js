import React from "react";

function SubdivisionLevel ({value, setValue}) {

    return (
        <div>
            <h5 style={{fontSize:"15px"}}>Parametro de optimización</h5>            
            <input 
            type="number" 
            placeholder="Ingrese un número" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            min={0}
            step={1}
            />
            <div>
            <t style={{fontSize:"11px"}}><i>Este parámetro define la cantidad de divisiones que tendrá el árbol BVH que se utiliza como estructura de aceleración al momento de graficar. Cuanto mayor es el numero, mayor cantidad de esferas permite tener</i></t>
            </div>
        </div>
    )
}

export default SubdivisionLevel;