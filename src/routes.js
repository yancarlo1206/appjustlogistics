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
import Cotizacion from "views/pages/cotizacion/Index";
import Edificios from "views/pages/edificios/Index";
import Apartamentos from "views/pages/apartamentos/Index";
import Espacios from "views/pages/espacios/Index";
import Clientes from "views/pages/clientes/Index";
import Procesos from "views/pages/procesos/Index";

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
  /*{
    path: "/cotizacion",
    name: "Cotizaciones",
    icon: "ni ni-credit-card text-success",
    component: <Cotizacion />,
    layout: "/admin",
  },
  {
    path: "/edificios",
    name: "Edificios",
    icon: "fa fa-city text-primary",
    component: <Edificios />,
    layout: "/admin",
  },
  {
    path: "/apartamentos",
    name: "Apartamentos",
    icon: "ni ni-building text-primary",
    component: <Apartamentos />,
    layout: "/admin",
  },
  {
    path: "/espacios",
    name: "Espacios",
    icon: "fa fa-ruler text-warning",
    component: <Espacios />,
    layout: "/admin",
  },*/
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
