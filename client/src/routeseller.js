import SellerDashboard from "./views/SellerDashboard";
import AddLand from "./views/AddLand";
import ApproveRequest from "./views/ApproveRequest";
import sellerProfile from "./views/sellerProfile";
import viewImage from "./views/viewImage";
import updateSeller from "./views/updateSeller";
import Help from "./Help";

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
  {
    path: "/Help",
    name: "Help",
    rtlName: "الرموز",
    icon: "tim-icons icon-image-02",
    component: Help,
    layout: "/Seller",
  },
  {
    path: "/updateSeller",
    name: "",
    rtlName: "الرموز",
    icon: "tim-icons",
    component: updateSeller,
    layout: "/Seller",
  },
];
export default routes;
