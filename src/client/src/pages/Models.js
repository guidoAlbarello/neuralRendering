import './Models.css'
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
        const { data } = await axios.get("http://localhost:8000/scenes");
        setModels(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const getModelClasses = (id) => { 
    if (activeModelIndex === id) {
      return "menu-button active"
    }
    return "menu-button"
   }

  const isModelEnabled = (model) => {
    return model.status !== "PROCESSED"
  }

  const toggleActiveModel = (model) => {
    setActiveModelIndex(model.id)
    setActiveModel(model)
  }

  const activeModelView = (model) => {
  
    const someEventHandler = (id) => {
      console.log('navigating')
      navigate('/models/' + id)
    }
  
    return (
    <>
      <div>
        <p>
          <b>Model: </b> {model.name}
        </p>
        <p>
            <b>Description:</b>
        </p>
        <p>
            <i>{model.description}</i>
        </p>
      </div>
      <button type="button" onClick={(e) => {someEventHandler(model.id)}}>
        Explore
      </button>
    </>);
  };

  return (
    <>
      <div className='grid-container'>
        <div className='item-menu'>
          <ul>
            {models.map((m) => (
              <li key={m.id}>
                <button key={m.id} type="button" className={getModelClasses(m.id)} disabled={isModelEnabled(m)} onClick={(e) => {toggleActiveModel(m)}}>
                  {m.name}
                </button>
              </li>
            ))
            }
            <button type="button" onClick={(e) => {navigate('/upload')}}> Upload new model </button>
          </ul>
        </div>
        <div className='item-main'>
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