"use client";

import { 
    List, 
    Datagrid, 
    TextField, 
    NumberField,
    EditButton, 
    DeleteButton 
} from "react-admin";

export const UnitList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <NumberField source="courseId" label="Course ID" />
            <NumberField source="order" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

