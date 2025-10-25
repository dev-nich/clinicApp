import {
  Admin,
  Resource,
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
import authProvider from './security/authProvider';
import BroadcastOnPersonalTwoToneIcon from '@mui/icons-material/BroadcastOnPersonalTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PersonalInjuryTwoToneIcon from '@mui/icons-material/PersonalInjuryTwoTone';
export const App = () => (
  <Admin
    dataProvider={simpleRestProvider("http://localhost:3001/api")}
    layout={Layout}
    dashboard={Dashboard}
    theme={radiantLightTheme}
    authProvider={authProvider}
  >
    <Resource
      name="persons"
      list={PersonList}
      show={PersonShow}
      edit={PersonEdit}
      create={PersonCreate}
      icon={PeopleAltTwoToneIcon}
    />
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      edit={EmployeeEdit}
      create={EmployeeCreate}
      icon={BadgeTwoToneIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
      icon={SupervisedUserCircleTwoToneIcon}
    />
    <Resource
      name="positions"
      list={PositionList}
      show={PositionShow}
      edit={PositionEdit}
      create={PositionCreate}
      icon={BroadcastOnPersonalTwoToneIcon}
    />
    <Resource
      name="access"
      list={AccessList}
      show={AccessShow}
      edit={AccessEdit}
      create={AccessCreate}
      icon={AdminPanelSettingsTwoToneIcon}
    />
    <Resource
      name="patients"
      list={PatientList}
      show={PatientShow}
      edit={PatientEdit}
      create={PatientCreate}
      icon={PersonalInjuryTwoToneIcon}
    />
    <Resource
      name="appointments"
      list={AppointmentList}
      show={AppointmentShow}
      edit={AppointmentEdit}
      create={AppointmentCreate}
      icon={CalendarMonthTwoToneIcon}
    />
  </Admin>
);
