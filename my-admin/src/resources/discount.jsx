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
  useRecordContext
} from "react-admin";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { formatDiscount } from "../utils/formatters";
import Typography from "@mui/material/Typography";

const DiscountField = () =>{
  const record = useRecordContext();
  return formatDiscount(record.value, record.value_type)
}

const DiscountList = () => {
  return (
    <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col source="name" />
        <DataTable.Col source="description" />
        <DataTable.Col label="Discount" >
          <DiscountField />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const DiscountShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="value" />
      <TextField source="value_type" />
    </SimpleShowLayout>
  </Show>
);

const DiscountEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="value" />
      <SelectInput
            source="value_type"
            choices={[
              { id: "value", name: "Exact Value" },
              { id: "percentage", name: "Percentage" },
            ]}
            validate={[required()]}
          />
    </SimpleForm>
  </Edit>
);

const DiscountCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="value" />
      <SelectInput
            source="value_type"
            choices={[
              { id: "value", name: "Exact Value" },
              { id: "percentage", name: "Percentage" },
            ]}
            validate={[required()]}
          />
    </SimpleForm>
  </Create>
);

export { DiscountList, DiscountShow, DiscountEdit, DiscountCreate };
