import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import {AuthContextProvider} from "./context/AuthContext";
import {WorkoutsContextProvider} from "./context/WorkoutContext"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <WorkoutsContextProvider><App /></WorkoutsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


