import React, { useEffect, useState } from "react";
import axios from "axios";

const Models = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/models");
        setModels(data.models);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-4">
          <div className="list-group">
            {models.map((m) => (
              <button type="button" className="list-group-item list-group-item-action">
                {m.name}
              </button>
            ))
            }
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
    </React.Fragment>
  );
};

/*
      {models.map((m) => (
        <article key={m.id}>
          <Link to={`/models/${m.id}`}>
            <h1>{m.name}</h1>
          </Link>
          <p>{m.description}</p>
        </article>
      ))}


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
*/


  
  export default Models;