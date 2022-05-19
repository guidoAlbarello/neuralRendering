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
          <a className="navbar-brand" href="#">Terrain Processor</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              <a className="nav-link" href="#">Models</a>
              <a className="nav-link" href="#">Explorer</a>
              <a className="nav-link disabled">Docs</a>
            </div>
          </div>
        </div>
      </nav>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  )

/*
  <div className="app">
  <h1>Word Associations Map</h1>
  <input value={word} onChange={e => setWord(e.target.value)} />
  <button onClick={getAssociations}>Find Associations</button>
  {associations && (
    Object.keys(associations).length === 0
      ? <p>No results</p>
      : <div>
        {Object.entries(associations).map(([association, score]) => (
          <span style={{ fontSize: Math.pow(score, 2) / 200 }}>
            {association}
            {' '}
          </span>
        ))}
      </div>
  )}
</div>

  return (
    <div className="container">
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Terrain Processor</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                <a className="nav-link" href="#">Models</a>
                <a className="nav-link" href="#">Explorer</a>
                <a className="nav-link disabled">Docs</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="list-group">
            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
              Model A
            </button>
            <button type="button" className="list-group-item list-group-item-action">Model B</button>
            <button type="button" className="list-group-item list-group-item-action">Model C</button>
            <button type="button" className="list-group-item list-group-item-action">Model D</button>
            <button type="button" className="list-group-item list-group-item-action" disabled>Model E (processing...)</button>
          </div>
          <button type="button" className="btn btn-outline-primary">
            Upload new model
          </button>
        </div>
        <div className="col-sm-8">
          <div>
            <p>This is the canvas</p>
            <img alt='canvas-sample' src="img.png"/>
            <canvas>

            </canvas>
            <p>
                <b>A description of the image</b>
            </p>
            <p>
                <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</i>
            </p>
          </div>
          <button type="button" className="btn btn-outline-primary">
            Navigate
          </button>
        </div>
      </div>
    </div>
  );
  */
}

export default App;
