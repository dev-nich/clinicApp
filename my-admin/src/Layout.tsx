import type { ReactNode } from "react";
import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  Menu,
} from "react-admin";
import Submenu from "./Submenu";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalHospitalTwoToneIcon from "@mui/icons-material/LocalHospitalTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Submenu text="Clinic" icon={<LocalHospitalTwoToneIcon />}>
      <Menu.ResourceItem name="persons" />
      <Menu.ResourceItem name="patients" />
      <Menu.ResourceItem name="appointments" />
    </Submenu>
    <Submenu text="Account" icon={<SettingsTwoToneIcon />}>
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="access" />
      <Menu.ResourceItem name="positions" />
    </Submenu>
    <Submenu text="HR" icon={<GroupsTwoToneIcon />}>
      <Menu.ResourceItem name="employees" />
    </Submenu>
  </Menu>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyMenu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
