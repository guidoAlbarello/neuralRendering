import React, { useEffect, useState } from "react";
import axios from "axios";
import Model from './Model'

const Models = () => {
  const [models, setModels] = useState([]);
  const [activeModelIndex, setActiveModelIndex] = React.useState();
  const [activeModel, setActiveModel] = React.useState();

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

  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <div className="list-group mb-3">
            {models.map((m) => (
              <button key={m.id} type="button" className={getModelClasses(m.id)} disabled={isModelEnabled(m)} onhover onClick={(e) => {toggleActiveModel(m)}}>
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
          { activeModel && Model(activeModel) }
        </div>
      </div>
    </>
  );
};
  
export default Models;