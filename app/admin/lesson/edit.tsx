"use client";

import { 
    Edit, 
    SimpleForm, 
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required 
} from "react-admin";

export const LessonEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" validate={[required()]} />
            <TextInput source="description" multiline validate={[required()]} />
            <ReferenceInput source="unitId" reference="units">
                <SelectInput optionText="title" validate={[required()]} />
            </ReferenceInput>
            <NumberInput source="order" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

