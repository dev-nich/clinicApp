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
  FunctionField,
  RichTextField
} from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import moment from "moment";
import { RichTextInput } from 'ra-input-rich-text';

const notifCreateFilter = { 
     path: 'patient',
     populate: {
       path: 'person',
       model: 'Person'
     } 
  }


const NotificationList = () => {
  // TODO: Display appointment details in multiline format
  return (
    <List exporter={false} queryOptions={{ meta: { prefetch: ['author'] } }}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="appointment">
          <ReferenceField 
            source="appointment" 
            reference="appointments" 
            // queryOptions={{ populate: notifCreateFilter }}
            link={false}
            >
            {/* <FunctionField 
              render={(record) => { console.log(record);
                return `${moment(record.appointment_date).format("L")} - ${record.patient.person.first_name} - ${record.details}`}} 
            /> */}
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
  // TODO: Display appointment details in multiline format  
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
        <RichTextField source="html" />
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
      <RichTextInput source="html" />
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
        filter={{ populate: notifCreateFilter }}
        link={false}
      >
        <AutocompleteInput
          validate={required()}
          label="Appointment"
          optionText={(record) => {
            return `${moment(record.appointment_date).format("L")} - ${record.patient} - ${record.details}`;
          }}
        />
      </ReferenceInput>
      <TextInput source="subject" />
      <RichTextInput source="html" />
      <SelectInput
        source="type"
        choices={[
          { id: "email", name: "Email" },
          { id: "sms", name: "SMS" },
        ]}
      />
    </SimpleForm>
  </Create>
);

export { NotificationList, NotificationShow, NotificationEdit, NotificationCreate };
