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
import Dashboard from "./views/Dashboard";
import Icons from "./views/Icons";
import Map from "./views/Map";
import Notifications from "./views/Notifications";
import Rtl from "./views/Rtl";
import TableList from "./views/TableList";
import Typography from "./views/Typography";
import UserProfile from "./views/UserProfile";

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
    path: "/LIDashboard",
    name: "Lands Info",
    rtlName: "الرموز",
    icon: "tim-icons icon-world",
    component: LIDashboard,
    layout: "/admin",
  },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-square-pin",
  //   component: Map,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Request History",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-refresh-02",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Land Owned",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-badge",
  //   component: Typography,
  //   layout: "/admin",
  // },

];
export default routes;
