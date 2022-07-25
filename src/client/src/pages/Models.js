import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Models = () => {
  const [models, setModels] = useState([]);
  const [activeModelIndex, setActiveModelIndex] = useState();
  const [activeModel, setActiveModel] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("http://localhost:8888/api/v1/models");
        setModels(data.models);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const getModelClasses = (id) => { 
    if (activeModelIndex === id) {
      return "list-group-item list-group-item-action active"
    }
    return "list-group-item list-group-item-action"
   }

  const isModelEnabled = (model) => {
    return model.status !== "SHADER_CREATED"
  }

  const toggleActiveModel = (model) => {
    setActiveModelIndex(model.id)
    setActiveModel(model)
  }

  const activeModelView = (model) => {
  
    const getThumbnail = (url) => {
      return "http://localhost:8888/" + url
    }
  
    const someEventHandler = (id) => {
      console.log('navigating')
      navigate('/models/' + id)
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
        <button type="button" className="btn btn-outline-primary" onClick={(e) => {someEventHandler(model.id)}}>
          Explore
        </button>
      </>);
    };

  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <div className="list-group mb-3">
            {models.map((m) => (
              <button key={m.id} type="button" className={getModelClasses(m.id)} disabled={isModelEnabled(m)} onClick={(e) => {toggleActiveModel(m)}}>
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
          <Outlet />
          { 
            activeModel && activeModelView(activeModel) 
          }
        </div>
      </div>
    </>
  );
};
  
export default Models;