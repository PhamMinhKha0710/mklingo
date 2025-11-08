"use client";

import { 
    List, 
    Datagrid, 
    TextField, 
    NumberField,
    BooleanField,
    EditButton, 
    DeleteButton 
} from "react-admin";

export const ChallengeOptionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="text" />
            <BooleanField source="correct" />
            <NumberField source="challengeId" label="Challenge ID" />
            <TextField source="imageSrc" label="Image" />
            <TextField source="audioSrc" label="Audio" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

