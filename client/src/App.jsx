import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Test from "./pages/Test";
import { AuthProvider } from "./context/AuthContext";
import { PAGES } from "./constants/pages";
import { Admin, Resource, CustomRoutes, nanoLightTheme, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { EmployeeList, EmployeeEdit, EmployeeShow } from "./admin/Employee";
import { PersonList, PersonEdit, PersonShow } from "./admin/Person";
import Dashboard from "./admin/dashboard"
import Layout from "./admin/Layout"
const dataProvider = simpleRestProvider("http://localhost:3001/api");
// import dataProvider from './DataProvider'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Admin 
          dashboard={Dashboard}
          dataProvider={dataProvider}
          // layout={Layout}
          theme={nanoLightTheme}
          >
            {/* <Header>
              <Routes>
                {PAGES.map((item) => {
                  return <Route path={item.path} element={item.component} />;
                })}
              </Routes>
            </Header> */}

            <Resource name="employees" list={EmployeeList} edit={EmployeeEdit} show={EmployeeShow} />
            <Resource name="persons" list={PersonList} edit={PersonEdit} show={PersonShow} />
            <CustomRoutes>
              <Route path="/settings" element={<Landing />} />
              <Route path="/profile" element={<Test />} />
            </CustomRoutes>
          </Admin>
        </AuthProvider>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
