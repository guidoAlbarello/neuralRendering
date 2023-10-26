import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Inicio');

    const navigationMap = {
        'Inicio': '/',
        'Escenas': '/models',
        'Cargar un modelo': '/upload'
    };

    return (
        <div className="navbar">
            {Object.keys(navigationMap).map(item => (
                <Link 
                    key={item}
                    to={navigationMap[item]}
                    className={`navbar-item ${activeItem === item ? 'active' : ''}`}
                    onClick={() => setActiveItem(item)}
                >
                    {item}
                </Link>
            ))}
        </div>
    );
};

export default Navbar;
