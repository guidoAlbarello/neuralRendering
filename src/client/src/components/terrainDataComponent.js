import React from 'react';

function TerrainDataComponent({ data, headline, handleChange }) { // props destructuring
    return (
        <div>
            <h5 style={{fontSize:"15px"}}>{headline}</h5>

            <div>
            <label style={{fontSize:"14px"}}>Cantidad de puntos por dimensión:</label>
            <input className='form-input'
                type='number'
                placeholder='Ingrese un numero'
                value={data.points_per_dimension}
                onChange={(e) => handleChange('points_per_dimension', e.target.value)}
                min={0}
                step={1}
            />
            <br></br>
            <t style={{fontSize:"11px"}}>
            <i>Cada eje se dividirá en esta cantidad de partes. 
            Por ejemplo tenemos un cubo con cantidad de puntos por dimension 4, por lo que si calculamos la cantidad toal de puntos es 4x4x4=64</i>
            </t>
            </div>

            <div>
            <label style={{fontSize:"14px"}}>Máximo número de esferas que se permite construir por material:</label>
            <input className='form-input'
                type='number'
                placeholder='Ingrese un numero'
                value={data.max_spheres}
                onChange={(e) => handleChange('max_spheres', e.target.value)}
                min={0}
                step={1}
            />
            </div>
            </div>
    );
}

export default TerrainDataComponent;
