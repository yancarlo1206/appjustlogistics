/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Login from "views/pages/login/Login.jsx";
import Clientes from "views/pages/clientes/Index";
import Procesos from "views/pages/procesos/Index";
import Tracking from "views/pages/tracking/Index";

var routes = [
  /*{
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-danger",
    component: <Index />,
    layout: "/admin",
  },*/
  {
    path: "/clientes",
    name: "Clientes",
    icon: "fa fa-users text-primary",
    component: <Clientes />,
    layout: "/admin",
  },
  {
    path: "/procesos",
    name: "Procesos",
    icon: "ni ni-credit-card text-primary",
    component: <Procesos />,
    layout: "/admin",
  },
  {
    path: "/tracking",
    name: "Tracking",
    icon: "ni ni-delivery-fast text-info",
    component: <Tracking />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    invisible: true
  },
];
export default routes;
