import './App.css';
import { Outlet, Link } from "react-router-dom";


function App() {
  /*
  const [word, setWord] = React.useState('software');
  const [models, setModels] = React.useState(null);

  const getModels = () => {
    fetch('/api/v1/models')
      .then(result => result.json())
      .then(body => setModels(body));
  };
  */
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" aria-current="page" href="/">Terrain Processor</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {
                // className="nav-link active" href="/models">Models</a>
              }
              <a className="nav-link" href="/models">Models</a>
              <a className="nav-link" href="/explorer">Explorer</a>
              <a className="nav-link disabled">Docs</a>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default App;
