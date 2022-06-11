import React from "react";

const Model = (model) => {

  const getThumbnail = (url) => {
    return "http://localhost:8888/" + url
  }

    return (
    <>
      <div className="mb-4">
        <p>
          <b>Model name</b> {model.name}
        </p>
        <img alt='canvas-sample' src={getThumbnail(model.thumbnail_url)}/>
        <p>
            <b>Brief description</b>
        </p>
        <p>
            <i>{model.description}</i>
        </p>
      </div>
      <button type="button" className="btn btn-outline-primary">
        Navigate
      </button>
    </>);
  };
  
  export default Model;