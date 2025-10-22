import {
  Create,
  TextField,
  SimpleShowLayout,
  Show,
  Edit,
  SimpleForm,
  TextInput,
  List,
  DataTable,
  required,
  ReferenceInput,
  AutocompleteInput,
  ReferenceField,
} from "react-admin";
const UserList = () => {
  return (
    <List exporter={false}>
      <DataTable>
        <DataTable.Col source="username" />
        <DataTable.Col label="Access">
          <ReferenceField source="access" reference="access">
            <TextField source="title" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Employee">
          <ReferenceField source="employee" reference="employees">
            <ReferenceField source="person" reference="persons">
              <TextField source="first_name" />{" "}
              <TextField source="middle_name" />{" "}
              <TextField source="last_name" />{" "}
              <TextField source="suffix" />{" "}
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Position">
          <ReferenceField source="employee" reference="employees">
            <ReferenceField source="position" reference="positions">
              <TextField source="title" />
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const UserShow = () => (
  <Show authLoading={<p>Checking for permissions...</p>}>
    <SimpleShowLayout>
      <TextField source="username" />
      <ReferenceField source="access" reference="access">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="employee" reference="employees">
        <ReferenceField source="person" reference="persons">
          <TextField source="first_name" /> <TextField source="middle_name" />{" "}
          <TextField source="last_name" /> <TextField source="suffix" />{" "}
        </ReferenceField>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="password" />

      <ReferenceInput source="access" label="Access" reference="access">
        <AutocompleteInput
          validate={required()}
          optionText="title"
          optionValue="id"
        />
      </ReferenceInput>
      <ReferenceInput source="employee" reference="employees" filter={{ "populate": "person" }}>
          <AutocompleteInput
            label="Employee"
            disabled
            optionText={(employee) => {
              return `${employee.person.first_name} ${employee.person.middle_name} ${employee.person.last_name} ${employee.person.suffix}`;
            }}
            optionValue="id"
          />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);


const UserCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
      <TextInput source="username" validate={required()} />
      <TextInput source="password" validate={required()} />
      <ReferenceInput source="access" label="Access" reference="access">
        <AutocompleteInput
          validate={required()}
          optionText="title"
          optionValue="id"
        />
      </ReferenceInput>
      <ReferenceInput source="employee" reference="employees" filter={{ "populate": "person" }}>
          <AutocompleteInput
            label="Employee"
            optionText={(employee) => {
              return `${employee.person.first_name} ${employee.person.middle_name} ${employee.person.last_name} ${employee.person.suffix}`;
            }}
            optionValue="id"
          />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export { UserList, UserShow, UserEdit, UserCreate };
