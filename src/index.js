import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Store from './store/store';
import { Provider } from 'react-redux';

const store = Store();

ReactDOM.render(
<Provider store = {store} >
    <App />
</Provider>
    ,
  document.getElementById('root')
);
