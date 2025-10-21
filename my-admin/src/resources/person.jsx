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
  SelectInput
} from "react-admin";
const PersonList = () => {
  return (
    <List>
      <DataTable>
        <DataTable.Col source="first_name" />
        <DataTable.Col source="middle_name" />
        <DataTable.Col source="last_name" /> 
        <DataTable.Col source="suffix" />
        <DataTable.Col source="address" /> 
        <DataTable.Col source="contact" />
        <DataTable.Col source="gender" />
        <DataTable.Col source="birth_date" field={DateField} />
        <DataTable.Col source="email" field={EmailField}/>
      </DataTable>
    </List>
  );
};

const PersonShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="first_name" /> 
      <TextField source="middle_name" />
      <TextField source="last_name" /> 
      <TextField source="suffix" />
      <TextField source="address" /> 
      <TextField source="contact" />
      <TextField source="gender" /> 
      <DateField source="birth_date" />
      <EmailField source="email" /> 
    </SimpleShowLayout>
  </Show>
);

const PersonEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="first_name" /> 
      <TextInput source="middle_name" />
      <TextInput source="last_name" /> 
      <SelectInput source="suffix" choices={[
            { id: ' ', name: 'None' },
            { id: 'Sr', name: 'Sr' },
            { id: 'Jr', name: 'Jr' },
            { id: 'III', name: 'III' },
            { id: 'IV', name: 'IV' },
            { id: 'V', name: 'V' },
            ]} />
      <TextInput source="address" /> 
      <TextInput source="contact" />
      <SelectInput source="gender" choices={[
            { id: 'M', name: 'Male' },
            { id: 'F', name: 'Female' },
            ]} />
      <DateInput source="birth_date" />
      <TextInput source="email" /> 
    </SimpleForm>
  </Edit>
);

const PersonCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues warnWhenUnsavedChanges>
      <TextInput source="first_name" validate={[required()]} /> 
      <TextInput source="middle_name" validate={[required()]}/>
      <TextInput source="last_name" validate={[required()]}/> 
      <SelectInput source="suffix" choices={[
            { id: ' ', name: 'None' },
            { id: 'Sr', name: 'Sr' },
            { id: 'Jr', name: 'Jr' },
            { id: 'III', name: 'III' },
            { id: 'IV', name: 'IV' },
            { id: 'V', name: 'V' },
            ]} />
      <TextInput source="address" validate={[required()]}/> 
      <NumberInput source="contact" validate={[required()]}/>
      <SelectInput source="gender" choices={[
            { id: 'M', name: 'Male' },
            { id: 'F', name: 'Female' },
            ]} />
      <DateInput source="birth_date" validate={[required()]} />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);

export { PersonList, PersonShow, PersonEdit, PersonCreate };
