import React from 'react';
import Login from "./login.component";
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import RegisterBuyer from "./RegisterBuyer";
import RegisterSeller from "./RegisterSeller";
import AddLand from "./AddLand";
import ShowLand from "./ShowLand2";
import LIDashboard from "./LIDashboard";
import SellerDashboard from "./SellerDashboard";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router history={history}>
        <div className="img-wrapper">
          <img src="https://i.pinimg.com/originals/71/6e/00/716e00537e8526347390d64ec900107d.png" className="logo"/>
            <div className="wine-text-container">
              <h6 className="site-title wood-text">Land Registry</h6>
            </div>
          </div>
         <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                {/* <Route exact path='/' component={demo} /> */}
                <Route exact path="/" component={Login} />
                <Route path="/RegisterBuyer" component={RegisterBuyer} />
                <Route path="/RegisterSeller" component={RegisterSeller} />
                <Route path="/AddLand" component={AddLand} /> 
                <Route path="/ShowLand" component={ShowLand} /> 
                <Route path="/LIDashboard" component={LIDashboard} /> 
                <Route path="/SellerDashboard" component={SellerDashboard} /> 

              </Switch>
            </div>
          </div>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
