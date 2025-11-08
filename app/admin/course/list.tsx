"use client";

import { 
    List, 
    Datagrid, 
    TextField, 
    EditButton, 
    DeleteButton 
} from "react-admin";

export const CourseList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="imageSrc" label="Image" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

