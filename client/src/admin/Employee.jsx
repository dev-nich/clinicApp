import {
  List,
  DataTable,
  DateField,
  BooleanField,
  ReferenceField,
  EditButton,
  Edit,
  Show,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SimpleShowLayout,
  TextField,
  EmailField
} from "react-admin";

import { Card, CardContent } from "@mui/material";
import { Title } from "react-admin";
const EmployeeList = () => (
  <Card>
    <CardContent>
      <List>
        <DataTable>
          {/* <DataTable.Col source="person.id" label="Person Details">
                <ReferenceField source="person.id" reference="persons" />
            </DataTable.Col> */}
          {/* <DataTable.Col>
            <ReferenceField
              source="person.id"
              reference="persons"
              link="show"
            />
          </DataTable.Col> */}

          <DataTable.Col source="person.first_name" label="First Name" />
          <DataTable.Col source="person.middle_name" label="Middle Name" />
          <DataTable.Col source="person.last_name" label="Last Name" />
          <DataTable.Col source="person.suffix" label="Suffix" />
          <DataTable.Col source="position.title" label="Position" />
          <DataTable.Col>
            <EditButton />
          </DataTable.Col>
        </DataTable>
      </List>
    </CardContent>
  </Card>
);

const EmployeeEdit = () => (
  <Card>
    <Title title="Employee Edit" />
    <CardContent>
      <Edit>
        <SimpleForm>
          <TextInput source="position.title" />
        </SimpleForm>
      </Edit>
    </CardContent>
  </Card>
);

const EmployeeShow = () => {
  <Card>
    <CardContent>
    <Show>
        <SimpleShowLayout>
            <TextField source="first_name" />
            {/* <TextField source="middle_name" />
            <TextField source="last_name" />
            <TextField source="suffix" />
            <TextField source="address" />
            <TextField source="contact" />
            <TextField source="gender" />
            <DateField source="birth_date" />
            <EmailField source="email" />
            <TextField source="id" /> */}
        </SimpleShowLayout>
    </Show>
    </CardContent>
  </Card>
}

export { EmployeeList, EmployeeEdit, EmployeeShow};
