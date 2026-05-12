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
  Labeled,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  required,
  ReferenceField
} from "react-admin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const ServiceList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="price" />
        <DataTable.Col source="details" />
        <DataTable.Col source="category" />
        <DataTable.Col source="products" />
      </DataTable>
    </List>
  );
};

const ServiceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="details" />
      <TextField source="category" />
      <Labeled>
        <ArrayField source="attributes">
          <DataTable bulkActionButtons={false} empty={"-"}>
            <DataTable.Col source="key">
              <TextField source="key" />
            </DataTable.Col>
            <DataTable.Col source="value">
              <TextField source="value" />
            </DataTable.Col>
          </DataTable>
        </ArrayField>
      </Labeled>
    </SimpleShowLayout>
  </Show>
);

const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="description" />
      <TextInput source="category" />
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="attributes">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="key" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="value" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Edit>
);

const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="details" />
      <TextInput source="category" />
      <Box
        component="section"
        sx={{ m: 2, p: 1, border: "1px dashed grey", width: "90%" }}
      >
        <ArrayInput source="attributes">
          <SimpleFormIterator>
            <Grid container sx={{ width: "100%" }} spacing={1}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="key" validate={[required()]} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextInput source="value" />
              </Grid>
            </Grid>
          </SimpleFormIterator>
        </ArrayInput>
      </Box>
    </SimpleForm>
  </Create>
);

export { ServiceList, ServiceShow, ServiceEdit, ServiceCreate };
