import './App.css';

function App() {
  return (
    <div className="container">
      <div className="row">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Terrain Processor</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                <a class="nav-link" href="#">Models</a>
                <a class="nav-link" href="#">Explorer</a>
                <a class="nav-link disabled">Docs</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        <div class="col-sm-4">
            <div class="list-group">
            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
              Model A
            </button>
            <button type="button" class="list-group-item list-group-item-action">Model B</button>
            <button type="button" class="list-group-item list-group-item-action">Model C</button>
            <button type="button" class="list-group-item list-group-item-action">Model D</button>
            <button type="button" class="list-group-item list-group-item-action" disabled>Model E (processing...)</button>
          </div>
          <button type="button" class="btn btn-outline-primary">Upload model</button>
        </div>
        <div class="col-sm-8">
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
        </div>
      </div>
    </div>
  );
}

export default App;
