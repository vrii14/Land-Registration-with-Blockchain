import React from 'react';
import Login from "./login.component";
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import RegisterBuyer from "./RegisterBuyer";
import RegisterSeller from "./RegisterSeller";
import AddLand from "./AddLand";
import ShowLand from "./ShowLand2";
// import LIDashboard from "./LIDashboard";
// import SellerDashboard from "./SellerDashboard";
import AdminLayout from "./layouts/Admin/Admin";
import LI from "./layouts/Admin/LI";
import Seller from "./layouts/Admin/Seller";
import Land from "./layouts/Admin/AddLand";
import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import sellerProfile from "./sellerProfile";
import buyerProfile from "./buyerProfile";
import ApproveRequest from "./ApproveRequest";
import ApproveTransaction from "./ApproveTransaction";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <Router history={history}>
        {/* <div className="img-wrapper">
          <img src="https://i.pinimg.com/originals/71/6e/00/716e00537e8526347390d64ec900107d.png" className="logo"/>
            <div className="wine-text-container">
              <h6 className="site-title wood-text">Land Registry</h6>
            </div>
          </div>
         <div className="auth-wrapper">
            <div className="auth-inner"> */}
        <Switch>
          <Route exact path='/' component={Login} />
          {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" /> */}
          <Route path="/RegisterBuyer" component={RegisterBuyer} />
          <Route path="/RegisterSeller" component={RegisterSeller} />
          {/* <Route path="/AddLand" component={AddLand} /> */}
          <Route path="/admin/dashboard" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/ShowLand" to="/admin/dashboard" />
          <Route path="/admin/LIdashboard" render={(props) => <LI {...props} />} />
          <Redirect from="/LIdashboard" to="/admin/LIdashboard" />
          <Route path="/admin/SellerDashboard" render={(props) => <Seller {...props} />} />
          <Redirect from="/SellerDashboard" to="/admin/SellerDashboard" />
          <Route path="/admin/AddLand" render={(props) => <Land {...props} />} />
          <Redirect from="/AddLand" to="/admin/AddLand" />
          <Route path="/sellerProfile" component={sellerProfile} />
          <Route path="/buyerProfile" component={buyerProfile} />
          <Route path="/ApproveRequest" component={ApproveRequest} />
          <Route path="/ApproveTransaction" component={ApproveTransaction} />

          {/* <Route path="/LIDashboard" component={LIDashboard} />
      <Route path="/SellerDashboard" component={SellerDashboard} /> */}

        </Switch>
        {/* </div>
          </div> */}
      </Router>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
