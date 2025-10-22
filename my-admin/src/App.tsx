import {
  Admin,
  Resource,
  ListGuesser,
  ShowGuesser,
  EditGuesser,
  radiantLightTheme,
} from "react-admin";
import { Layout } from "./Layout";
import simpleRestProvider from "ra-data-simple-rest";
import {
  PersonList,
  PersonShow,
  PersonEdit,
  PersonCreate,
} from "./resources/person";
import {
  EmployeeList,
  EmployeeShow,
  EmployeeEdit,
  EmployeeCreate,
} from "./resources/employee";
import {
  PositionList,
  PositionShow,
  PositionEdit,
  PositionCreate,
} from "./resources/position";
import {
  AccessList,
  AccessShow,
  AccessEdit,
  AccessCreate,
} from "./resources/access";
import {
  PatientList,
  PatientShow,
  PatientEdit,
  PatientCreate,
} from "./resources/patient";
import {
    AppointmentList,
    AppointmentShow,
    AppointmentEdit,
    AppointmentCreate,
  } from "./resources/appointment";
import { UserList, UserShow, UserEdit, UserCreate } from "./resources/user";
import Dashboard from "./pages/dashboard";
import { createGunzip } from "zlib";
export const App = () => (
  <Admin
    dataProvider={simpleRestProvider("http://localhost:3001/api")}
    layout={Layout}
    dashboard={Dashboard}
    theme={radiantLightTheme}
  >
    <Resource
      name="persons"
      list={PersonList}
      show={PersonShow}
      edit={PersonEdit}
      create={PersonCreate}
    />
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      edit={EmployeeEdit}
      create={EmployeeCreate}
    />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name="positions"
      list={PositionList}
      show={PositionShow}
      edit={PositionEdit}
      create={PositionCreate}
    />
    <Resource
      name="access"
      list={AccessList}
      show={AccessShow}
      edit={AccessEdit}
      create={AccessCreate}
    />
    <Resource
      name="patients"
      list={PatientList}
      show={PatientShow}
      edit={PatientEdit}
      create={PatientCreate}
    />
  </Admin>
);
