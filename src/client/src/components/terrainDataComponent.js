import React from 'react';

function TerrainDataComponent({ data, headline, handleChange }) { // props destructuring
    return (
        <div>
            <h5>{headline}</h5>
            <div>
            <label>X Y Z Cube dimensions:</label>
            <input className='form-input'
                type='number'
                placeholder='Enter a number'
                value={data.dim_x_y_z}
                onChange={(e) => handleChange('dim_x_y_z', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Points per dimension:</label>
            <input className='form-input'
                type='number'
                placeholder='Enter a number'
                value={data.points_per_dimension}
                onChange={(e) => handleChange('points_per_dimension', e.target.value)}
                min={0}
                step={1}
            />
            </div>

            <div>
            <label>Maximum number of spheres to build per octanct:</label>
            <input className='form-input'
                type='number'
                placeholder='Enter a number'
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
