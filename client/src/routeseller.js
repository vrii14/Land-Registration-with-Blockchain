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
import SellerDashboard from "./views/SellerDashboard";
import AddLand from "./views/AddLand";
import ApproveRequest from "./views/ApproveRequest";
import sellerProfile from "./views/sellerProfile";
import viewImage from "./views/viewImage";


var routes = [
  {
    path: "/SellerDashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: SellerDashboard,
    layout: "/Seller",
  },
  {
    path: "/AddLand",
    name: "Add Land",
    rtlName: "الرموز",
    icon: "tim-icons icon-world",
    component: AddLand,
    layout: "/Seller",
  },
  {
    path: "/sellerProfile",
    name: "Seller Profile",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: sellerProfile,
    layout: "/Seller",
  },
  {
    path: "/ApproveRequest",
    name: "Land Requests",
    rtlName: "الرموز",
    icon: "tim-icons icon-badge",
    component: ApproveRequest,
    layout: "/Seller",
  },
  {
    path: "/viewImage",
    name: "Land Gallery",
    rtlName: "الرموز",
    icon: "tim-icons icon-image-02",
    component: viewImage,
    layout: "/Seller",
  },
];
export default routes;
