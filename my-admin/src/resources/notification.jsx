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
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  FunctionField
} from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import moment from "moment";
const NotificationList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="appointment">
          <ReferenceField source="appointment" reference="appointments" link={false}>
            <FunctionField 
              render={record => `${moment(record.appointment_date).format("L")} - `} 
            />
            <ReferenceField source="patient" reference="patients" link={false}>
              <ReferenceField source="person" reference="persons" link={false}>
                <TextField source="first_name" />
              </ReferenceField>
            </ReferenceField>
            <FunctionField 
              render={record => ` [${record.details}]`} 
            />
          </ReferenceField>
          
        </DataTable.Col>
        <DataTable.Col source="subject" />
        <DataTable.Col source="status" />
        <DataTable.Col source="type" />
      </DataTable>
    </List>
  );
};

const NotificationShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="appointment" reference="appointments" link={false}>
        <FunctionField
          label="Date" 
          render={record => `${moment(record.appointment_date).format("L")}`} 
        />
      </ReferenceField>
      <ReferenceField source="appointment" reference="appointments" link={false}>
        <FunctionField 
          render={record => `${moment(record.appointment_date).format("L")}`} 
        />
        <ReferenceField source="patient" reference="patients" link={false}>
          <ReferenceField source="person" reference="persons" link={false}>
            <TextField source="first_name" />
          </ReferenceField>
        </ReferenceField>
        <FunctionField 
        label="Name" 
          render={record => `${record.details}`} 
        />
      </ReferenceField>
          
        <TextField source="subject" />
        <TextField source="text" />
        <TextField source="html" />
        <TextField source="status" />
        <TextField source="type" />
    </SimpleShowLayout>
  </Show>
);

const NotificationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="subject" />
      <TextInput source="text" />
      <TextInput source="html" />
      <TextInput source="type" />
    </SimpleForm>
  </Edit>
);

const NotificationCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        source="appointment"
        label="Appointment"
        reference="appointments"
        link={false}
      >
          <ReferenceInput
          source="patient"
          label="Patient"
          reference="patients"
          link={false}
        >
            <ReferenceInput
            source="person"
            label="Person"
            reference="persons"
            link={false}
          >
              <AutocompleteInput
                validate={required()}
                label="Person"
                optionText={(person) => {
                  console.log(patient);
                  return `${person.first_name} ${person.middle_name} ${person.last_name} ${person.suffix}`;
                }}
              />
          </ReferenceInput>
        </ReferenceInput>
      </ReferenceInput>
      <TextInput source="subject" />
      <TextInput source="text" />
      <TextInput source="html" />
      <SelectInput
        source="type"
        choices={[
          { id: "Email", name: "Email" },
          { id: "SMS", name: "SMS" },
        ]}
      />
    </SimpleForm>
  </Create>
);

export { NotificationList, NotificationShow, NotificationEdit, NotificationCreate };
