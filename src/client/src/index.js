//import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';
import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Model from "./pages/Model";
import Models from "./pages/Models";
import Docs from "./pages/Docs";
import Explorer from "./pages/Explorer";
import NoPage from "./pages/NoPage";
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="models" element={<Models />} />
                    <Route path="models/:modelId" element={<Model />}/>
                    <Route path="docs" element={<Docs />} />
                    <Route path="explorer" element={<Explorer />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
