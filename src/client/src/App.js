import './App.css';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
    <nav>
      <ul className='navbar'>
          <li>
            <a aria-current="page" href="/">Terrain Processor</a>
          </li>
          <li>
            <a href="/models">Models</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
      </ul>
    </nav>
      <Outlet/>
    </>
  )
}

export default App;
