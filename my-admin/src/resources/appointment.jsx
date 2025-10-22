import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  List,
  DataTable,
  DateField,
  EmailField,
  required,
  NumberField,
  SelectField,
  NumberInput,
  SelectInput,
  Labeled
} from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const AppointmentList = () => {
  return (
    <List exporter={false}>
    </List>
  );
};

const AppointmentShow = () => (
  <Show>
  </Show>
);

const AppointmentEdit = () => (
  <Edit>
  </Edit>
);

const AppointmentCreate = () => (
  <Create>
  </Create>
);

export { AppointmentList, AppointmentShow, AppointmentEdit, AppointmentCreate };
