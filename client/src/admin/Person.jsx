import { List, DataTable, DateField, BooleanField, EmailField } from 'react-admin';
import {Show, SimpleShowLayout, TextField } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import { Title } from 'react-admin';
const PersonList = () => (
    <Card>
        <Title title="Person" />
        <CardContent>
        <List>
        <DataTable>
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="first_name" label="First Name"/>
            <DataTable.Col source="middle_name" label="Middle Name"/>
            <DataTable.Col source="last_name" label="Last Name"/>
            <DataTable.Col source="suffix" label="Suffix"/>
            <DataTable.Col source="birth_date" label="DOB" field={DateField}/>
            <DataTable.Col source="contact" />
            <DataTable.Col source="address" label="Suffix"/>
            <DataTable.Col source="email" field={EmailField}/>

            
        </DataTable>
    </List>
        </CardContent>
    </Card>
);

const PersonEdit = () => (
    <Card>
        <Title title=" " />
        <CardContent>
            Content here
        </CardContent>
    </Card>
);

const PersonShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="first_name" />
        </SimpleShowLayout>
    </Show>
);

export  {PersonList, PersonEdit, PersonShow}