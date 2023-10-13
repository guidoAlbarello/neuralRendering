import React from 'react';

function TerrainDataComponent({ data, headline, handleChange }) { // props destructuring
    return (
        <div>
            <h5>{headline}</h5>
            <div>
            <label>Dimensiones de X Y Z del cubo:</label>
            <input className='form-input'
                type='number'
                placeholder='Ingrese un numero'
                value={data.dim_x_y_z}
                onChange={(e) => handleChange('dim_x_y_z', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Cantidad de puntos por dimensión:</label>
            <input className='form-input'
                type='number'
                placeholder='Ingrese un numero'
                value={data.points_per_dimension}
                onChange={(e) => handleChange('points_per_dimension', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Máximo número de esferas que se permite construir por octante:</label>
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
