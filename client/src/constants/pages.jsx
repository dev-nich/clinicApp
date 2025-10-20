import Login from "../pages/Login";
import Test from "../pages/Test";
import Users from "../pages/Users";
import Patients from "../pages/Patients";
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
    order: 5,
  },
  {
    name: "Users",
    path: "/users",
    authAccess: true,
    component: <Users />,
    order: 4,
  },
  {
    name: "Employees",
    path: "/employees",
    authAccess: true,
    component: <Employees />,
    order: 5,
  },
  {
    name: "Logout",
    path: "/logout",
    authAccess: true,
    component: <Logout />,
    order: 6,
  },
  
];

export { PAGES };
