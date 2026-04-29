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
  useRecordContext,
  ReferenceInput,
  AutocompleteInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  FunctionField,
  FormDataConsumer,
  useEditContext,
  RecordField,
  ReferenceManyField
} from "react-admin";
import { useWatch } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { formatDiscount, formatDate, formatFullName, formatApptTitle } from "../utils/formatters";
import { FullName } from "../utils/componentFormatters";
import { Typography } from "@mui/material";
const PrintRequestField = () => {
  const record = useRecordContext();
  return (
    <ul>
      {
        record.print_request.map(
          (item, index) => { 
            return <li key={index}>{formatDate(item)}</li>
          }
        )
      }
    </ul>
  )
}

const InvoiceList = () => {
  return (
     <List exporter={false}>
      <DataTable bulkActionButtons={false}>
        <DataTable.Col label="Patient" source="patient">
            <ReferenceField source="patient" reference="patients" link={false}>
              <ReferenceField source="person" reference="persons" link={false}>
                <FullName />
            </ReferenceField>
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Appointment Date">
          <ReferenceField source="appointment" reference="appointments" link={false}>
            <DateField source="appointment_date" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col label="Print Request">
          <PrintRequestField />
        </DataTable.Col>
        <DataTable.Col label="Discount" >
          <ReferenceField source="discount" reference="discounts" link={false}>
            <TextField source="name" /> 
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

const TestField = () => {
  const record = useRecordContext();
  console.log("TEST", record)
}
const InvoiceShow = () => (
   <Show>
    <SimpleShowLayout>
      <ReferenceManyField 
    reference="appointments" 
    filter={{ populate: "names" }} // Only show published comments
>
<TestField />
</ReferenceManyField>
        <ReferenceField source="patient" reference="patients" link={false}>
          <ReferenceField source="person" reference="persons" link={false}>
            <FullName />
          </ReferenceField>
        </ReferenceField>
      <ReferenceField source="appointment" reference="appointments" link={false}>
        <DateField source="appointment_date" />
      </ReferenceField>
      <ReferenceField label="Print Request" reference="appointments" >
        <PrintRequestField />
      </ReferenceField>
      <ReferenceField source="discount" reference="discounts" link={false}>
        <TextField source="name" /> 
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

const InvoiceEdit = () => (
  <Edit>
      <SimpleForm>
          <ReferenceInput
            source="appointment"
            reference="appointments"
            filter={{populate: "names"}}
            link={false}
          >
            <AutocompleteInput
              label="Appointment"
              optionText={(item) => {
                return formatApptTitle(item)}}
              optionValue="id"
            />
          </ReferenceInput>
          <ReferenceInput
            source="discount"
            reference="discounts"
            link={false}
          >
            <AutocompleteInput
              label="Discount"
              optionText={(item) => {
                return `${(item.name)} `;
              }}
              optionValue="id"
            />
          </ReferenceInput>
        </SimpleForm>
  </Edit>
);

const InvoiceCreate = () => (
  <Create>
    <SimpleForm>
          <ReferenceInput
            source="appointment"
            reference="appointments"
            filter={{ populate: "names" }}
            link={false}
          >
            <AutocompleteInput
              label="Appointment"
              optionText={(item) => {
                return formatApptTitle(item);
              }}
              optionValue="id"
            />
          </ReferenceInput>
          <ReferenceInput
            source="discount"
            reference="discounts"
            link={false}
          >
            <AutocompleteInput
              label="Discount"
              optionText={(item) => {
                return `${(item.name)} `;
              }}
              optionValue="id"
            />
          </ReferenceInput>
        </SimpleForm>
  </Create>
);

export { InvoiceList, InvoiceShow, InvoiceEdit, InvoiceCreate };
