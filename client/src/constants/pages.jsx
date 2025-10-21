import Login from "../pages/Login";
import Test from "../pages/Test";
import Users from "../pages/Users";
import Patients from "../pages/Patients";
import Persons from "../pages/Persons";
import Employees from "../pages/Employees";
import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import Landing from "../pages/Landing";

const PAGES = [
  {
    name: "Landing",
    path: "/",
    authAccess: false,
    component: <Landing />,
    order: 1,
  },
  {
    name: "Login",
    path: "/login",
    authAccess: false,
    component: <Login />,
    order: 2,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    authAccess: true,
    component: <Dashboard />,
    order: 3,
  },
  {
    name: "Test",
    path: "/test",
    authAccess: true,
    component: <Test />,
    order: 4,
  },
  {
    name: "Users",
    path: "/users",
    authAccess: true,
    component: <Users />,
    order: 5,
  },
  {
    name: "Employees",
    path: "/employees",
    authAccess: true,
    component: <Employees />,
    order: 6,
  },
  {
    name: "Persons",
    path: "/persons",
    authAccess: true,
    component: <Persons />,
    order: 7,
  },
  {
    name: "Logout",
    path: "/logout",
    authAccess: true,
    component: <Logout />,
    order: 8,
  },
  
];

export { PAGES };
