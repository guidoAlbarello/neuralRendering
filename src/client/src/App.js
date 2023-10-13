import './App.css';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
    <nav>
      <ul className='navbar'>
          <li>
            <a aria-current="page" href="/">Inicio</a>
          </li>
          <li>
            <a href="/models">Escenas</a>
          </li>
          <li>
            <a href="/upload">Cargar un modelo</a>
          </li>
      </ul>
    </nav>
      <Outlet/>
    </>
  )
}

export default App;
