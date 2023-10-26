import React from "react";
import './Home.css'

const Home = () => {
    return (
      <div className="padded-container">
        <h1>Graficador de escenas</h1>
        <h3>Descripcion</h3>
        <p>En este sitio podés cargar modelos para luego visualizarlos y navegarlos.</p>
        <ul>
          <li>En la sección "Escenas" podras encontrar todos los modelos ya procesadas.</li>
          <li>En la sección "Cargar un modelo" podrás generar una nueva escena cargando un modelo.</li>
        </ul>
      </div>
    );
  };
  
  export default Home;