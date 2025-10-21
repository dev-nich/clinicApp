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
  BooleanField,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput
} from "react-admin";
const EmployeeList = () => {
  return (
    <List>
      <DataTable>
        <DataTable.Col source="person.first_name" label="First Name"/>
        <DataTable.Col source="person.middle_name" label="Middle Name" />
        <DataTable.Col source="person.last_name" label="Last Name" />
        <DataTable.Col source="person.suffix" label="Suffix"/>
        <DataTable.Col source="position.title" label="Position" />
      </DataTable>
    </List>
  );
};

const EmployeeShow = () => (
  <Show>
    <SimpleShowLayout>
    <TextField source="person.first_name" label="First Name" />
      <TextField source="person.middle_name" label="Middle Name" />
      <TextField source="person.last_name" label="Last Name" />
      <TextField source="person.suffix" label="Suffix" />
      <TextField source="position.title" label="Position"  />
      <DateField source="hire_date" />
      <NumberField source="salary" />
      <TextField source="is_active" label="Employee Active"/>
    </SimpleShowLayout>
  </Show>
);

const transformData = (data) => {
   data.person = data.person.id
   data.position = data.position.id

  return data
}

const EmployeeEdit = () => (
  <Edit transform={transformData}>
    <SimpleForm>
      <DateInput source="hire_date" /> 
      <NumberInput source="salary" />
      <BooleanInput source="is_active" /> 
      <ReferenceInput source="person.id" label="Person" reference="persons">
          <AutocompleteInput optionText={person => `${person.first_name} ${person.last_name}`}  />
      </ReferenceInput>
      <ReferenceInput source="position.id" label="Position" reference="positions">
          <AutocompleteInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

const EmployeeCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues warnWhenUnsavedChanges>
    <DateInput source="hire_date" /> 
      <DateInput source="salary" />
      <BooleanInput source="is_active" /> 
    </SimpleForm>
  </Create>
);

export { EmployeeList, EmployeeShow, EmployeeEdit, EmployeeCreate };
