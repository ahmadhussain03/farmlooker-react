import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './App.jsx';
import store from "./store/index";
import { Provider } from "react-redux";
import cookie from "js-cookie";
import axios from './utils/axios'

let token = cookie.get("token")

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
       <React.StrictMode>
         <App />
       </React.StrictMode>
    </Provider>,
     document.getElementById('root')
   );
}


axios.get('user').then((response) => {
  store.dispatch({ type: "SET_LOGIN", payload: response.data.data });
  render()
}).catch(error => {
  cookie.remove("token")
  render()
})


if(token){

} else {
  render()
}
