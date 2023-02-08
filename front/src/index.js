import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import { getUsers } from './redux/actions/users.reducer';
import { getSalons } from './redux/actions/salons.reducer';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = configureStore({reducer: reducers}, composedEnhancer)

//store.dispatch (getUsers)
store.dispatch (getUsers)
store.dispatch (getSalons)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = { store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
