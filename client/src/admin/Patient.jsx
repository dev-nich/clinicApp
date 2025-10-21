import { List, DataTable, DateField, BooleanField } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import { Title } from 'react-admin';
const EmployeeList = () => (
    <Card>
        <Title title="Employees" />
        <CardContent>
        <List>
        <DataTable>
            <DataTable.Col source="person.first_name" label="First Name"/>
            <DataTable.Col source="person.middle_name" label="Middle Name"/>
            <DataTable.Col source="person.last_name" label="Last Name"/>
            <DataTable.Col source="person.suffix" label="Suffix"/>
            <DataTable.Col source="position.title" label="Position"/>
        </DataTable>
    </List>
        </CardContent>
    </Card>
);

const EmployeeEdit = () => (
    <Card>
        <Title title="Employee Edit" />
        <CardContent>
            Content here
        </CardContent>
    </Card>
);

export  {EmployeeList, EmployeeEdit}