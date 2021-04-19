/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import LIDashboard from "./views/LIDashboard";
import buyerProfile from "./views/buyerProfile";
import Dashboard from "./views/Dashboard";
import Icons from "./views/Icons";
import Map from "./views/Map";
import Notifications from "./views/Notifications";
import Rtl from "./views/Rtl";
import TableList from "./views/TableList";
import Typography from "./views/Typography";
import UserProfile from "./views/UserProfile";
import viewImage from "./views/viewImage";
import OwnedLands from "./views/OwnedLands";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/buyerProfile",
    name: "Buyers Profile",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: buyerProfile,
    layout: "/admin",
  },
  {
    path: "/viewImage",
    name: "Land Gallery",
    rtlName: "الرموز",
    icon: "tim-icons icon-image-02",
    component: viewImage,
    layout: "/admin",
  },
  {
    path: "/OwnedLands",
    name: "Owned Lands",
    rtlName: "الرموز",
    icon: "tim-icons icon-chart-pie-36",
    component: OwnedLands,
    layout: "/admin",
  },
  
];
export default routes;
