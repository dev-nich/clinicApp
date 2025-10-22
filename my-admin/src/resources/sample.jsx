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
const AccessList = () => {
  return (
    <List exporter={false}>
    </List>
  );
};

const PersonShow = () => (
  <Show>
  </Show>
);

const PersonEdit = () => (
  <Edit>
  </Edit>
);

const PersonCreate = () => (
  <Create>
  </Create>
);

export { PersonList, PersonShow, PersonEdit, PersonCreate };
