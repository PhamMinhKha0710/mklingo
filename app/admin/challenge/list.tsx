"use client";

import { 
    List, 
    Datagrid, 
    TextField, 
    NumberField,
    EditButton, 
    DeleteButton 
} from "react-admin";

export const ChallengeList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="question" />
            <TextField source="type" />
            <NumberField source="lessonId" label="Lesson ID" />
            <NumberField source="order" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

