import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser } from "react-admin";
import { Layout } from "./Layout";
import simpleRestProvider from "ra-data-simple-rest";
import { PersonList, PersonShow, PersonEdit, PersonCreate} from './resources/person';
import { EmployeeList, EmployeeShow, EmployeeEdit, EmployeeCreate} from './resources/employee';
import Dashboard from './pages/dashboard';
export const App = () => (
  <Admin
    dataProvider={simpleRestProvider("http://localhost:3001/api")}
    layout={Layout}
    dashboard={Dashboard}
  >
    <Resource name="persons" list={PersonList} show={PersonShow} edit={PersonEdit} create={PersonCreate} />
    <Resource name="employees" list={EmployeeList} show={EmployeeShow} edit={EmployeeEdit} create={EmployeeCreate} />
    <Resource name="positions" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
    <Resource name="access" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
  </Admin>
);
