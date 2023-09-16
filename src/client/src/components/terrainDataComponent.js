import React from 'react';

function TerrainDataComponent({ data, headline, handleChange }) { // props destructuring
    return (
        <div>
            <h5>{headline}</h5>
            <div>
            <label>Dim X Y Z</label>
            <input className='form-input'
                type='number'
                placeholder='dim_x_y_z'
                value={data.dim_x_y_z}
                onChange={(e) => handleChange('dim_x_y_z', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Block width</label>
            <input className='form-input'
                type='number'
                placeholder='block widht'
                value={data.block_width}
                onChange={(e) => handleChange('block_width', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Points per dimension</label>
            <input className='form-input'
                type='number'
                placeholder='Points per dimension'
                value={data.points_per_dimension}
                onChange={(e) => handleChange('points_per_dimension', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Max spheres</label>
            <input className='form-input'
                type='number'
                placeholder='Max spheres'
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
