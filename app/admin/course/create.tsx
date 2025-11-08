"use client";

import { 
    Create, 
    SimpleForm, 
    TextInput, 
    required 
} from "react-admin";

export const CourseCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <TextInput source="imageSrc" label="Image Source" validate={[required()]} />
        </SimpleForm>
    </Create>
);

