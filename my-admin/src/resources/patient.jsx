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
  Labeled,
  FunctionField,
  ReferenceInput,
  AutocompleteInput,
  useRecordContext
} from "react-admin";
import Grid from "@mui/material/Grid";
const PatientList = () => {
  return (
    <List exporter={false}>
      <DataTable>
      <DataTable.Col label="Name">
      <FunctionField
                render={record => `${record.employee.person.first_name} ${record.employee.person.middle_name} ${record.employee.person.last_name} ${record.employee.person.suffix}`}
        />
      </DataTable.Col>
        </DataTable>
    </List>
  );
};

const PatientShow = () => (

  
  <Show authLoading={<p>Checking for permissions...</p>}>
  <SimpleShowLayout>
      <TextField source="username" />
      <DateField source="employee.hire_date" />
      <TextField source="employee.person" />
      <TextField source="access.title" />
  </SimpleShowLayout>
</Show>
);

const PatientEdit = () => (
  <Edit>
    <SimpleForm>
      <Grid container sx={{ width: "100%" }} spacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="first_name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="middle_name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="last_name" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="suffix"
            choices={[
              { id: " ", name: "None" },
              { id: "Sr", name: "Sr" },
              { id: "Jr", name: "Jr" },
              { id: "III", name: "III" },
              { id: "IV", name: "IV" },
              { id: "V", name: "V" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <DateInput source="birth_date" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectInput
            source="gender"
            choices={[
              { id: "Male", name: "Male" },
              { id: "Female", name: "Female" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="address" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="contact" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextInput source="email" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

const PatientCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
    <Grid container sx={{ width: "100%" }} spacing={1}>

        <Grid size={{ xs: 12, sm: 4 }}><TextInput source="first_name" validate={[required()]} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextInput source="middle_name" validate={[required()]} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextInput source="last_name" validate={[required()]} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><SelectInput
        source="suffix"
        choices={[
          { id: " ", name: "None" },
          { id: "Sr", name: "Sr" },
          { id: "Jr", name: "Jr" },
          { id: "III", name: "III" },
          { id: "IV", name: "IV" },
          { id: "V", name: "V" },
        ]}
      /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><DateInput source="birth_date" validate={[required()]} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><SelectInput
        source="gender"
        choices={[
          { id: "Male", name: "Male" },
          { id: "Female", name: "Female" },
        ]}
      /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextInput source="address" validate={[required()]} /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextInput source="contact" validate={[required()]} /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextInput source="email"/></Grid>
    </Grid>
    </SimpleForm>
  </Create>
);

export { PatientList, PatientShow, PatientEdit, PatientCreate };
