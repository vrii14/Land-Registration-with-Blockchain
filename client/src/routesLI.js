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
import ApproveTransaction from "./views/ApproveTransaction";


var routes = [
  {
    path: "/LIDashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: LIDashboard,
    layout: "/LI",
  },
  {
    path: "/ApproveTransaction",
    name: "Transfer Requests",
    rtlName: "الرموز",
    icon: "tim-icons icon-send",
    component: ApproveTransaction,
    layout: "/LI",
  },
];
export default routes;
