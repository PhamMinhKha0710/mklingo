"use client";

import { 
    Edit, 
    SimpleForm, 
    TextInput, 
    required 
} from "react-admin";

export const CourseEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" validate={[required()]} />
            <TextInput source="imageSrc" label="Image Source" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

