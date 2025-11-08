"use client";

import { 
    List, 
    Datagrid, 
    TextField, 
    NumberField,
    EditButton, 
    DeleteButton 
} from "react-admin";

export const LessonList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <NumberField source="unitId" label="Unit ID" />
            <NumberField source="order" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

